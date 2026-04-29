import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { writeClient } from "@/lib/sanity";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("matera_admin_token")?.value === "authenticated";

  if (!isAdmin) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const { patches } = await request.json();

    if (!patches || !Array.isArray(patches)) {
      return new NextResponse("Invalid patches", { status: 400 });
    }

    // Execute patches in a transaction
    const transaction = writeClient.transaction();
    
    for (const patch of patches) {
      const { id, set, insert, unset, move } = patch;
      
      // 1. Handle move (reordering)
      if (move) {
        const { path, direction } = move;
        // path is like "work.items[_key == '...']"
        const arrayPath = path.split("[")[0];
        const itemKey = path.match(/_key == "([^"]+)"/)?.[1];
        
        if (arrayPath && itemKey) {
          // Fetch the document to get the current array
          const doc = await writeClient.getDocument(id);
          if (doc && doc[arrayPath] && Array.isArray(doc[arrayPath])) {
            const array = [...doc[arrayPath]];
            const index = array.findIndex((item: any) => item._key === itemKey);
            if (index !== -1) {
              const newIndex = direction === 'up' ? index - 1 : index + 1;
              if (newIndex >= 0 && newIndex < array.length) {
                const [movedItem] = array.splice(index, 1);
                array.splice(newIndex, 0, movedItem);
                transaction.patch(id, { set: { [arrayPath]: array } });
              }
            }
          }
        }
        continue;
      }

      // 2. Ensure target arrays exist for insertions
      if (insert) {
        const arrayPath = (insert.after || insert.before || insert.replace || "").split("[")[0];
        if (arrayPath) {
          transaction.patch(id, { setIfMissing: { [arrayPath]: [] } });
        }
      }

      // 3. Apply standard patches
      const patchObj: any = {};
      if (set) patchObj.set = set;
      if (insert) patchObj.insert = insert;
      if (unset) patchObj.unset = unset;
      
      transaction.patch(id, patchObj);
    }

    await transaction.commit();

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Sanity Patch Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

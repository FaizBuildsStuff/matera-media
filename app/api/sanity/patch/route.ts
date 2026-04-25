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

    // Execute patches in a transaction or sequence
    const transaction = writeClient.transaction();
    
    patches.forEach((patch: any) => {
      const { id, set, insert, unset } = patch;
      const patchObj: any = {};
      if (set) patchObj.set = set;
      if (insert) patchObj.insert = insert;
      if (unset) patchObj.unset = unset;
      
      transaction.patch(id, patchObj);
    });

    await transaction.commit();

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Sanity Patch Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

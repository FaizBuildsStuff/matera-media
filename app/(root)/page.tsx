import { client } from "@/lib/sanity";
import { pageQuery } from "@/lib/queries";
import { SectionRenderer, type SectionBlock } from "@/components/SectionRenderer";

// Always fetch fresh data from Sanity — no caching
export const revalidate = 0;

export default async function Home() {
  const page = await client.fetch<{ sections?: SectionBlock[] } | null>(
    pageQuery,
    { slug: "home" },
    { cache: "no-store" }
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#05180D]">
      <main className="grow">
        <SectionRenderer sections={page?.sections ?? undefined} />
      </main>
    </div>
  );
}

import { client } from "@/lib/sanity";
import { pageQuery } from "@/lib/queries";
import { SectionRenderer, type SectionBlock } from "@/components/SectionRenderer";
import { Footer } from "@/components/Footer";

export default async function Home() {
  const page = await client.fetch<{ sections?: SectionBlock[] } | null>(
    pageQuery,
    { slug: "home" }
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#05180D]">
      <main className="grow">
        <SectionRenderer sections={page?.sections ?? undefined} />
      </main>
      <Footer />
    </div>
  );
}

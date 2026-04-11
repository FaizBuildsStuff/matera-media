import { client } from "@/lib/sanity";
import { careersPageQuery } from "@/lib/queries";
import CareersPageClient from "@/components/CareersPageClient"; 

export const revalidate = 0;

export default async function CareersPage() {
  const data = await client.fetch<
    | {
        label?: string;
        title?: string;
        highlightedWord?: string;
        description?: string;
        items?: Array<{
          title: string;
          department: string;
          location: string;
          type: string;
          link: string;
        }>;
      }
    | null
  >(careersPageQuery, {}, { cache: "no-store" });

  return (
    <main className="min-h-screen bg-[#05180D]">
      <CareersPageClient content={data ?? undefined} />
    </main>
  );
}
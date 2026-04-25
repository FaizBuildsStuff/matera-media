import { client } from "@/lib/sanity";
import { servicePageQuery } from "@/lib/queries";
import AdCreativesClient from "@/components/AdCreativesClient";

export const revalidate = 0;

export default async function AdCreativesPage() {
  const data = await client.fetch(servicePageQuery, { slug: "ad-creatives" }, { cache: "no-store" });

  if (!data) {
    return (
      <div className="flex flex-col min-h-screen bg-[#05180D] items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-emerald-500/20 border-t-emerald-500 animate-spin" />
      </div>
    );
  }

  return <AdCreativesClient data={data} />;
}
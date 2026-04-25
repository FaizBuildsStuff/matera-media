import { client } from "@/lib/sanity";
import { servicePageQuery } from "@/lib/queries";
import OrganicContentYouTubeClient from "@/components/OrganicContentYouTubeClient";

export const revalidate = 0;

export default async function OrganicContentYouTubePage() {
  const data = await client.fetch(servicePageQuery, { slug: "organic-content-youtube" }, { cache: "no-store" });

  if (!data) {
    return (
      <div className="flex flex-col min-h-screen bg-[#05180D] items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-emerald-500/20 border-t-emerald-500 animate-spin" />
      </div>
    );
  }

  return <OrganicContentYouTubeClient data={data} />;
}

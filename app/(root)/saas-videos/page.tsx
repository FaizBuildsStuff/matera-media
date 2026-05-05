import { client } from "@/lib/sanity";
import { servicePageQuery } from "@/lib/queries";
import SaasVideosClient from "@/components/SaasVideosClient";

export const revalidate = 0;

export default async function SaasVideosPage() {
  const data = await client.fetch(servicePageQuery, { slug: "saas-videos" }, { cache: "no-store" });

  if (!data) {
    return (
      <div className="flex flex-col min-h-screen bg-[#050505] items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin" />
      </div>
    );
  }

  return <SaasVideosClient data={data} />;
}
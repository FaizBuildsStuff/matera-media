import { client } from "@/lib/sanity";
import { careersPageQuery } from "@/lib/queries";
import CareersPageClient from "@/components/CareersPageClient"; 
import { Header } from "@/components/Header";

// This ensures the page refreshes when you publish in Sanity
export const revalidate = 0; 

export default async function CareersPage() {
  // 1. Fetch data from the standalone 'careers-page' document
  const data = await client.fetch(careersPageQuery);

  return (
    <main className="min-h-screen bg-[#05180D]">
      <Header />
      {/* 2. Pass the Sanity data into the Client Component */}
      <CareersPageClient content={data} />
    </main>
  );
}
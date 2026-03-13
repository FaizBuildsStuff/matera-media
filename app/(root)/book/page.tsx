import { client } from "@/lib/sanity";
import { bookingPageQuery } from "@/lib/queries";
import { BookCallPage, type BookingPageContent } from "@/components/BookCallPage";

export const revalidate = 60;

export default async function BookPage() {
  const data = await client.fetch<{
    title?: string;
    subtitle?: string;
    benefits?: string[];
    trustText?: string;
    calendlyUrl?: string;
  } | null>(bookingPageQuery);

  const content: BookingPageContent | undefined = data
    ? {
        title: data.title,
        subtitle: data.subtitle ?? undefined,
        benefits: data.benefits ?? undefined,
        trustText: data.trustText ?? undefined,
        calendlyUrl: data.calendlyUrl ?? undefined,
      }
    : undefined;

  return <BookCallPage content={content} />;
}
const { createClient } = require("@sanity/client");

const client = createClient({
  projectId: "begnjjeb",
  dataset: "product",
  token:
    "skwBidt0A7YiFYnIkQWSTXWocH8i6aX0IdtJ7ZSwLBTXIApzP590UDgSm01u3qJ6euoncvPh7pMTKEjGmpBp3mpLMNztOg2UEWQo5bfZFlyQHtyAzikxzOicnrxoyHaA5yapEoO0vJOebkfarwM6ITqnpWodEUQlRSIIr3K8Rwf2THSZCoUb",
  useCdn: false,
  apiVersion: "2023-01-01",
});

async function recoverContent() {
  try {
    // 1. Find the document ID for 'ad-creatives'
    const doc = await client.fetch(
      "*[_type == 'servicePage' && slug.current == 'ad-creatives'][0]{_id}",
    );
    if (!doc) {
      console.log("Document not found");
      return;
    }
    const docId = doc._id;
    console.log(`Found Document ID: ${docId}`);

    // 2. Try to fetch the document at a specific time (9-10 hours ago)
    // Current local time: 2026-04-09T22:42 (UTC+5) -> 17:42 UTC
    // 10 hours ago: 07:42 UTC
    const targetTime = "2026-04-09T07:42:00Z";

    console.log(`Attempting to fetch state at: ${targetTime}`);

    // Sanity History API request
    // Note: The history API is not exposed on the standard client.fetch usually.
    // We might need to use the request method.
    try {
      const historyUrl = `/history/product/documents/${docId}?time=${targetTime}`;
      const result = await client.request({ url: historyUrl });
      console.log("\n--- CONTENT RECOVERED ---\n");
      console.log(JSON.stringify(result, null, 2));
      console.log("\n--------------------------\n");
    } catch (err) {
      console.error("History API fetch failed:", err.message);

      // Fallback: Just fetch all versions for today if possible?
      // Actually, let's try to fetch the transaction log.
      console.log("Attempting to fetch recent transactions...");
      const transUrl = `/history/product/transactions?document=${docId}`;
      const transactions = await client.request({ url: transUrl });
      console.log(`Found ${transactions.length} transactions.`);

      // Display the most recent one that is around 9-10 hours old
      // We'll just dump them for now to see.
      console.log(JSON.stringify(transactions.slice(0, 5), null, 2));
    }
  } catch (e) {
    console.error("Recovery failed:", e);
  }
}

recoverContent();

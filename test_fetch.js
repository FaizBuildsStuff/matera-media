const { createClient } = require('@sanity/client');

const client = createClient({ 
    projectId: 'begnjjeb', 
    dataset: 'product', 
    useCdn: false, 
    apiVersion: '2023-01-01' 
});

const servicePageQuery = `*[_type == "servicePage" && (slug == $slug || _id == $slug)][0]{
  slug,
  plansLabel,
  plansTitle,
  plansSubtitle,
  plans[]{
    _key,
    name,
    description,
    features,
    popular
  }
}`;

async function main() {
    try {
        const result = await client.fetch(servicePageQuery, { slug: "ad-creatives" });
        console.log(JSON.stringify(result, null, 2));
    } catch (e) {
        console.error('Failed to update:', e.message);
    }
}

main();

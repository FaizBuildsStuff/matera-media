const { createClient } = require('@sanity/client'); 

const client = createClient({ 
    projectId: 'begnjjeb', 
    dataset: 'product', 
    token: 'skwBidt0A7YiFYnIkQWSTXWocH8i6aX0IdtJ7ZSwLBTXIApzP590UDgSm01u3qJ6euoncvPh7pMTKEjGmpBp3mpLMNztOg2UEWQo5bfZFlyQHtyAzikxzOicnrxoyHaA5yapEoO0vJOebkfarwM6ITqnpWodEUQlRSIIr3K8Rwf2THSZCoUb', 
    useCdn: false, 
    apiVersion: '2023-01-01' 
}); 

const recoveredData = {
    headlineTitle: "Performance creative that",
    headlineHighlight: "stops the scroll",
    headlineTitleAfter: "and drives revenue.",
    headlineSubtitle: "A systematic approach to winning creative: hooks, angles, and high-CTR edits that build ROI-backed campaigns.",
    heroCta: "Book a Free Creative Audit",
    problemsLabel: "The Performance Gap",
    problemsTitle: "Why most creatives fail to scale",
    problems: [
        {
            _key: "p1",
            title: "Invisible Hooks",
            description: "If you don't stop the scroll in 2 seconds, your entire spend is wasted. Most brands fail to test hooks aggressively."
        },
        {
            _key: "p2",
            title: "Generic Production",
            description: "Most brands ship 'pretty' videos without a testing framework. High production value doesn't equal high conversion."
        },
        {
            _key: "p3",
            title: "Guessing, Not Testing",
            description: "Wasting budget on random creative edits instead of following an iteration loop of data-backed winners."
        }
      ],
      solutionsLabel: "Solutions",
      solutionsTitle: "How we fix it",
      solutions: [
        {
          _key: "s1",
          description: "We produce variations fast, read performance signals, and double down on winners.",
          title: "Hook testing + iteration loop"
        },
        {
          _key: "s2",
          description: "Pacing, pattern interrupts, captions, and CTA structure designed for watch time and clicks.",
          title: "Performance-first editing system"
        },
        {
          _key: "s3",
          description: "Angles, messaging, and offer clarity mapped before we touch the timeline.",
          title: "Creative strategy built into production"
        }
      ]
};

async function restoreContent() {
    try {
        console.log("Starting restoration to service-ad-creatives...");
        
        const result = await client
            .patch("service-ad-creatives")
            .set(recoveredData)
            .commit();
            
        console.log("Restoration successful!");
        console.log("Updated Revision:", result._rev);
    } catch (e) {
        console.error("Restoration failed:", e.message);
    }
}

restoreContent();

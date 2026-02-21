// Fetch home page: use slug "home" to get document with _id "home" or slug.current "home"
export const pageQuery = `*[_type == "page" && (_id == $slug || slug.current == $slug)][0]{
  _id,
  title,
  slug,
  sections[]{
    _type,
    _key,
    ...,
    items[]{
      _key,
      ...,
      "image": image.asset->url,
      videoUrl
    },
    steps[]{
      _key,
      ...
    },
    plans[]{
      _key,
      ...
    }
  }
}`;

// Fetch service page by slug (ad-creatives | organic-content-youtube | saas-videos)
export const servicePageQuery = `*[_type == "servicePage" && slug == $slug][0]{
  slug,
  sectionLabel,
  headlineTitle,
  headlineHighlight,
  headlineTitleAfter,
  headlineSubtitle,
  bookACallHeading,
  bookACallCta,
  problemsLabel,
  problemsTitle,
  problems[]{
    _key,
    title,
    description
  },
  solutionsLabel,
  solutionsTitle,
  solutions[]{
    _key,
    title,
    description
  },
  resultsLabel,
  resultsTitle,
  results[]{
    _key,
    label,
    value
  },
  plansLabel,
  plansTitle,
  plansSubtitle,
  plans[]{
    _key,
    name,
    description,
    features,
    popular
  },
  calendlyTitle,
  calendlySubtitle,
  faqLabel,
  faqTitle,
  faqHighlightedWord,
  faqItems[]{
    _key,
    question,
    answer
  }
}`;

// Fetch legal page by slug (privacy-policy)
export const legalPageQuery = `*[_type == "legalPage" && slug == $slug][0]{
  slug,
  title,
  subtitle,
  lastUpdated,
  content[]{
    _key,
    heading,
    body
  }
}`;

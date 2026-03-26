// Fetch home page: use slug "home" to get document with _id "home" or slug.current "home"
export const pageQuery = `*[_type == "page" && (_id == $slug || slug.current == $slug)][0]{
  _id,
  title,
  slug,
  sections[]{
    _type,
    _key,
    ...,
    _type == "careers" => {
      label,
      title,
      highlightedWord,
      items[]{
        title,
        department,
        location,
        type,
        link
      }
    },
    _type == "workShowcase" => {
      title,
      highlightedWord,
      description,
      items[]{
        _key,
        title,
        category,
        tags,
        "image": image.asset->url,
        videoSource,
        videoUrl,
        "directVideoUrl": videoFile.asset->url, // Resolves the PC upload path
        link
      }
    },
    _type == "testimonials" => {
      label,
      title,
      description,
      items[]{
        _key,
        name,
        role,
        quote,
        "image": image.asset->url
      }
    },
    steps[]{ _key, ... },
    plans[]{ _key, ... }
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
  heroCta,
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
    value,
    "image": image.asset->url
  },
  processLabel,
  processTitle,
  processSteps[]{
    _key,
    name,
    desc
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
  work{
    title,
    highlightedWord,
    description,
    items[]{
      _key,
      title,
      category,
      tags,
      "image": image.asset->url,
      videoSource,
      videoUrl,
      "directVideoUrl": videoFile.asset->url,
      link
    }
  },
  calendlyTitle,
  calendlySubtitle,
  calendlyHighlightedWord,
  calendlyUrl,
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

// Booking page (single document)
export const bookingPageQuery = `*[_type == "bookingPage" && _id == "booking-page"][0]{
  title,
  subtitle,
  benefits,
  trustText,
  calendlyUrl
}`;

export const careersPageQuery = `*[_type == "careersPage" && _id == "careers-page"][0]{
  label,
  "title": headline,
  highlightedWord,
  description,
  "items": openRoles[]{
    title,
    department,
    location,
    type,
    link
  }
}`;
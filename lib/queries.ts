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

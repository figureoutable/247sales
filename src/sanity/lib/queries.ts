export const postListQuery = `
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    "category": category->title,
    publishedAt,
    "mainImage": mainImage.asset->url,
    excerpt
  }
`;

export const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    "category": category->title,
    publishedAt,
    "mainImage": mainImage.asset->url,
    body,
    excerpt
  }
`;

export const latestPostsQuery = `
  *[_type == "post"] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    "category": category->title,
    publishedAt,
    "mainImage": mainImage.asset->url,
    excerpt
  }
`;

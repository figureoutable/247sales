// Schema types for reference when using Sanity Studio (optional)
// Run sanity init in a separate studio repo and use these definitions.

export const postSchema = {
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" } },
    { name: "category", title: "Category", type: "reference", to: [{ type: "category" }] },
    { name: "publishedAt", title: "Published at", type: "datetime" },
    { name: "mainImage", title: "Main image", type: "image", options: { hotspot: true } },
    { name: "excerpt", title: "Excerpt", type: "text" },
    { name: "body", title: "Body", type: "blockContent" },
  ],
};

export const categorySchema = {
  name: "category",
  title: "Category",
  type: "document",
  fields: [{ name: "title", title: "Title", type: "string" }],
};

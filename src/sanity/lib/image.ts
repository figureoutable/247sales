import imageUrlBuilder from "@sanity/image-url";
import { client } from "./client";

const builder = imageUrlBuilder(client);

export function urlFor(source: { asset?: { _ref?: string }; _type?: string } | null) {
  if (!source?.asset?._ref) return "";
  return builder.image(source).auto("format").fit("max");
}

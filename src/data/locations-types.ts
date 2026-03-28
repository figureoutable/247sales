export type LocationRegion = "surrey" | "south-west-london";

export type TownEntry = {
  slug: string;
  region: LocationRegion;
  displayName: string;
  listLabel: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  whyFigures: string;
  hubBlurb: string;
  faqs: { q: string; a: string }[];
};

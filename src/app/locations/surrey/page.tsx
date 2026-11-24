import type { Metadata } from "next";
import { SURREY_HUB_INTRO, SURREY_HUB_META } from "@/data/locations";
import { SURREY_TOWN_PAGES } from "@/data/locations-surrey-towns";
import { RegionHubPage } from "@/components/locations/RegionHubPage";

export const metadata: Metadata = {
  title: { absolute: SURREY_HUB_META.title },
  description: SURREY_HUB_META.description,
  alternates: { canonical: "/locations/surrey" },
};

export default function SurreyHubPage() {
  return <RegionHubPage region="surrey" name="Surrey" intro={SURREY_HUB_INTRO} townsHeading="Towns we support in Surrey" towns={SURREY_TOWN_PAGES} />;
}

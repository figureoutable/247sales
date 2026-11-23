import type { Metadata } from "next";
import { SW_LONDON_HUB_INTRO, SW_LONDON_HUB_META } from "@/data/locations";
import { SW_LONDON_TOWN_PAGES } from "@/data/locations-sw-towns";
import { RegionHubPage } from "@/components/locations/RegionHubPage";

export const metadata: Metadata = {
  title: { absolute: SW_LONDON_HUB_META.title },
  description: SW_LONDON_HUB_META.description,
  alternates: { canonical: "/locations/south-west-london" },
};

export default function SouthWestLondonHubPage() {
  return (
    <RegionHubPage
      region="south-west-london"
      name="South West London"
      intro={SW_LONDON_HUB_INTRO}
      townsHeading="Areas we cover in South West London"
      towns={SW_LONDON_TOWN_PAGES}
    />
  );
}

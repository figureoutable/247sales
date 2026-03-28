import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTownBySlug, townPath } from "@/data/locations";
import { SW_LONDON_TOWN_PAGES } from "@/data/locations-sw-towns";
import { TownLocationPage } from "@/components/locations/TownLocationPage";

type Props = { params: Promise<{ townSlug: string }> };

export function generateStaticParams() {
  return SW_LONDON_TOWN_PAGES.map((t) => ({ townSlug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { townSlug } = await params;
  const town = getTownBySlug(townSlug);
  if (!town || town.region !== "south-west-london") return { title: "Not found" };

  return {
    title: { absolute: town.metaTitle },
    description: town.metaDescription,
    alternates: { canonical: townPath("south-west-london", town.slug) },
  };
}

export default async function SouthWestLondonTownPage({ params }: Props) {
  const { townSlug } = await params;
  const town = getTownBySlug(townSlug);
  if (!town || town.region !== "south-west-london") notFound();

  return <TownLocationPage town={town} />;
}

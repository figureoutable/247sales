import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTownBySlug, townPath } from "@/data/locations";
import { SURREY_TOWN_PAGES } from "@/data/locations-surrey-towns";
import { TownLocationPage } from "@/components/locations/TownLocationPage";

type Props = { params: Promise<{ townSlug: string }> };

export function generateStaticParams() {
  return SURREY_TOWN_PAGES.map((t) => ({ townSlug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { townSlug } = await params;
  const town = getTownBySlug(townSlug);
  if (!town || town.region !== "surrey") return { title: "Not found" };

  return {
    title: { absolute: town.metaTitle },
    description: town.metaDescription,
    alternates: { canonical: townPath("surrey", town.slug) },
  };
}

export default async function SurreyTownPage({ params }: Props) {
  const { townSlug } = await params;
  const town = getTownBySlug(townSlug);
  if (!town || town.region !== "surrey") notFound();

  return <TownLocationPage town={town} />;
}

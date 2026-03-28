import { SURREY_TOWN_PAGES } from "./locations-surrey-towns";
import { SW_LONDON_TOWN_PAGES } from "./locations-sw-towns";
import type { LocationRegion, TownEntry } from "./locations-types";

export type { LocationRegion, TownEntry } from "./locations-types";

export const SITE_ORIGIN = "https://tryfigures.com";

export const LOCATIONS_PATH = "/locations";
export const SURREY_HUB_PATH = "/locations/surrey";
export const SW_LONDON_HUB_PATH = "/locations/south-west-london";

export const ALL_TOWN_PAGES: TownEntry[] = [...SURREY_TOWN_PAGES, ...SW_LONDON_TOWN_PAGES];

const bySlug = new Map<string, TownEntry>();
for (const t of ALL_TOWN_PAGES) {
  bySlug.set(t.slug, t);
}

export function getTownBySlug(slug: string): TownEntry | undefined {
  return bySlug.get(slug);
}

export function townPath(region: LocationRegion, slug: string): string {
  if (region === "surrey") return `${SURREY_HUB_PATH}/${slug}`;
  return `${SW_LONDON_HUB_PATH}/${slug}`;
}

export function otherTownLinks(current: TownEntry): { region: LocationRegion; label: string; href: string }[] {
  return ALL_TOWN_PAGES.filter((t) => t.slug !== current.slug).map((t) => ({
    region: t.region,
    label: t.listLabel,
    href: townPath(t.region, t.slug),
  }));
}

export const LOCATIONS_ROOT_INTRO =
  "Figures Chartered Accountants is based in Woking and works with SME founders, directors and owner-managed businesses across Surrey and South West London. Whether you need year-end compliance, payroll, VAT, management reporting or strategic finance input, we combine chartered standards with the responsiveness of a dedicated small-team practice. Explore our Surrey coverage for towns from Guildford to Camberley, or our South West London pages for centres such as Kingston, Richmond and Wimbledon. Each area page explains how we support local businesses and links through to the services that match your stage.";

export const SURREY_HUB_INTRO =
  "Figures Chartered Accountants is headquartered in Woking, which puts us at the heart of Surrey’s commercial networks while allowing us to serve limited companies, contractors and growing SMEs in every corner of the county. From research-led businesses around Guildford to director-heavy communities in Elmbridge, logistics and services firms near the M25 in Spelthorne, and scaling companies along the M3 corridor, we tailor bookkeeping, VAT, payroll, statutory accounts, corporation tax and management reporting to how each client actually trades. We are happy to work remotely for speed, and to meet face to face in Surrey when a conversation beats a spreadsheet comment. Our focus is simple: deadlines met, tax treated correctly, numbers you can use for hiring and investment, and advice in plain English — whether you are a single-director company or a multi-site SME building headcount.";

export const SURREY_HUB_META = {
  title: "Accountants in Surrey | Small Business Accountants | Figures",
  description:
    "Small business accountants across Surrey — Woking-based Figures Chartered Accountants. Year-end accounts, tax, VAT, payroll and Xero for Surrey SMEs and founders.",
} as const;

export const SW_LONDON_HUB_INTRO =
  "South West London combines some of the UK’s most active SME and director communities with the pace and opportunity of the capital. Figures Chartered Accountants is based in Woking, which gives us straightforward access for meetings across Kingston, Richmond, Wimbledon, Sutton and Twickenham while keeping our operations efficient and our fee structure grounded. We support limited companies with bookkeeping and Xero, VAT, payroll and PAYE, statutory accounts and corporation tax, management reporting, cash flow forecasting, and fractional CFO input when leadership teams need part-time finance leadership. Whether you run a professional practice, a hospitality group, a consultancy, or a trade business serving London clients, we align compliance with your real-world cash cycles and growth plans — remotely day to day, and in person across South West London whenever it helps you decide faster.";

export const SW_LONDON_HUB_META = {
  title: "Accountants in South West London | Figures Chartered Accountants",
  description:
    "Chartered accountants for South West London SMEs and directors. Figures is Woking-based with easy access to Kingston, Richmond, Wimbledon, Sutton and Twickenham.",
} as const;

export const LOCATIONS_ROOT_META = {
  title: "Areas We Serve | Surrey & South West London | Figures",
  description:
    "Areas we serve: Surrey and South West London SME accounting from Figures Chartered Accountants, Woking-based. Town pages, services and local business support.",
} as const;

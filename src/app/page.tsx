import { OrganizationJsonLd } from "@/components/OrganizationJsonLd";
import { HomeBlog } from "@/components/redesign/HomeBlog";
import { HomeDashboards } from "@/components/redesign/generated/HomeDashboards";
import {
  HomeAreas,
  HomeAudience,
  HomeChecklists,
  HomeCompare,
  HomeCta,
  HomeFaq,
  HomeGuarantee,
  HomeHero,
  HomeMeetJosh,
  HomePricing,
  HomeServices,
  HomeTestimonials,
  HomeTrust,
} from "@/components/redesign/generated/Home";

export default function Home() {
  return (
    <>
      <OrganizationJsonLd />
      <HomeHero />
      <HomeTrust />
      <HomeAudience />
      <HomeServices />
      <HomeGuarantee />
      <HomeCompare />
      <HomeTestimonials />
      <HomeDashboards />
      <HomePricing />
      <HomeMeetJosh />
      <HomeChecklists />
      <HomeBlog />
      <HomeFaq />
      <HomeAreas />
      <HomeCta />
    </>
  );
}

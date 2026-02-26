import { Hero } from "@/components/Hero";
import { ServicesOverview } from "@/components/ServicesOverview";
import { WhyFigures } from "@/components/WhyFigures";
import { Testimonials } from "@/components/Testimonials";
import { AboutTeaser } from "@/components/AboutTeaser";
import { BlogPreview } from "@/components/BlogPreview";
import { FAQ } from "@/components/FAQ";
import { CTABanner } from "@/components/CTABanner";
import { CalEmbed } from "@/components/CalEmbed";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <WhyFigures />
      <Testimonials />
      <AboutTeaser />
      <BlogPreview />
      <FAQ />
      <CTABanner />
      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24" aria-labelledby="book-call-home-heading">
        <div className="mx-auto max-w-4xl">
          <h2 id="book-call-home-heading" className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">
            Book a discovery call
          </h2>
          <p className="mt-2 text-center text-slate-600">
            Choose a time below — no need to leave this page.
          </p>
          <CalEmbed className="mt-8" />
        </div>
      </section>
    </>
  );
}

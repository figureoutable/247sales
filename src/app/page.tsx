import { Hero } from "@/components/Hero";
import { ServicesOverview } from "@/components/ServicesOverview";
import { WhyFigures } from "@/components/WhyFigures";
import { Testimonials } from "@/components/Testimonials";
import { AboutTeaser } from "@/components/AboutTeaser";
import { BlogPreview } from "@/components/BlogPreview";
import { FAQ } from "@/components/FAQ";
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
      <section
        className="px-4 py-[2.68rem] sm:px-6 sm:py-[3.35rem] lg:px-8 lg:py-[4.02rem]"
        aria-labelledby="book-call-home-heading"
      >
        <div className="mx-auto max-w-4xl">
          <h2 id="book-call-home-heading" className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">
            Book a discovery call
          </h2>
          <CalEmbed className="mt-[1.34rem]" />
        </div>
      </section>
      <FAQ />
    </>
  );
}

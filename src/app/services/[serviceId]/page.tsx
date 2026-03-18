import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICES } from "@/lib/constants";
import { SERVICE_PAGES } from "@/data/service-pages";

type Props = { params: Promise<{ serviceId: string }> };

function getService(serviceId: string) {
  return SERVICES.find((s) => s.id === serviceId) ?? null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { serviceId } = await params;
  const service = getService(serviceId);
  if (!service) return { title: "Service not found" };

  return {
    title: service.title,
    description: service.description,
  };
}

export default async function ServicePage({ params }: Props) {
  const { serviceId } = await params;
  const service = getService(serviceId);
  if (!service) notFound();

  const content = SERVICE_PAGES[service.id as keyof typeof SERVICE_PAGES];
  if (!content) notFound();

  return (
    <div className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-4xl">
        <Link href="/services" className="text-sm font-medium text-slate-600 hover:text-black hover:underline">
          Back to services
        </Link>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          {service.title}
        </h1>
        <p className="mt-6 text-lg text-slate-600">{content.intro}</p>

        <div className="mt-14 space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-slate-900">What we do</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600">
              {content.whatWeDo.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900">How we do it</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-slate-600">
              {content.howWeWork.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900">Items to note</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600">
              {content.itemsToNote.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900">What we need from you</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600">
              {content.whatWeNeedFromYou.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900">Typical timeline</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600">
              {content.typicalTimeline.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900">More detail</h2>
            <div className="mt-4 space-y-4 text-slate-600">
              {content.extraCopy.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900">Frequently asked questions</h2>
            <div className="mt-6 space-y-6">
              {content.faqs.map((faq) => (
                <div key={faq.q}>
                  <p className="font-semibold text-slate-900">{faq.q}</p>
                  <p className="mt-2 text-slate-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-12 rounded-2xl bg-slate-50 p-8 text-center">
          <p className="text-lg font-medium text-slate-900">Want to talk it through?</p>
          <p className="mt-2 text-slate-600">Book a free discovery call and we will point you to the right service.</p>
          <a
            href="https://cal.com/figures/discoverycall"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-slate-800"
          >
            Schedule a call
          </a>
        </div>
      </div>
    </div>
  );
}


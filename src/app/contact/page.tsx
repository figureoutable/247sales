import type { Metadata } from "next";
import { ContactS0, ContactS2 } from "@/components/redesign/generated/Contact";
import { ContactPanel } from "@/components/redesign/ContactPanel";

export const metadata: Metadata = {
  title: "Contact a Chartered Accountant in Surrey & London",
  alternates: { canonical: "/contact" },
  description:
    "Get in touch with Figures. Send a message or schedule a discovery call. UK accounting and advisory for founders and small businesses.",
};

export default function ContactPage() {
  return (
    <>
      <ContactS0 />
      <ContactPanel />
      <ContactS2 />
    </>
  );
}

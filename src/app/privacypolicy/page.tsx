import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Figures Chartered Accountants",
  description:
    "Figures Chartered Accountants privacy policy. How we collect, use and protect your personal data when you use our accounting, tax and fractional CFO services.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
          Privacy Policy
        </h1>
        <p className="mt-4 text-slate-600 dark:text-zinc-400">
          Last updated: February 2025
        </p>

        <div className="mt-12 space-y-10 text-slate-600 dark:text-zinc-400">
          <section>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              1. Who we are
            </h2>
            <p className="mt-3">
              Figures Chartered Accountants (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) provides accounting, tax and fractional CFO services to UK businesses. This privacy policy explains how we collect, use and protect your personal data when you use our website at tryfigures.com or our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              2. What data we collect
            </h2>
            <p className="mt-3">
              We may collect and process the following:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-6">
              <li><strong className="text-slate-900 dark:text-white">Identity and contact data:</strong> name, email address, phone number, job title, company name.</li>
              <li><strong className="text-slate-900 dark:text-white">Engagement data:</strong> information you provide when booking a call, filling in forms, or corresponding with us.</li>
              <li><strong className="text-slate-900 dark:text-white">Financial and business data:</strong> where we provide accounting or tax services, the information necessary to deliver those services (e.g. records, bank details, HMRC-related information).</li>
              <li><strong className="text-slate-900 dark:text-white">Technical data:</strong> IP address, browser type, device information, and how you use our website (e.g. pages visited).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              3. How we use your data
            </h2>
            <p className="mt-3">
              We use your data to:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-6">
              <li>Provide our services (accounting, tax, fractional CFO and related advice).</li>
              <li>Respond to enquiries and manage discovery calls and ongoing client relationships.</li>
              <li>Send relevant updates (where you have agreed or we have a legitimate interest).</li>
              <li>Improve our website and services and comply with legal and regulatory obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              4. Legal basis (UK GDPR)
            </h2>
            <p className="mt-3">
              We process personal data where: (a) it is necessary to perform a contract with you or to take steps at your request; (b) we have a legitimate interest (e.g. running our business, improving our services, marketing to existing clients); (c) you have given consent; or (d) we have a legal obligation to do so.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              5. Sharing and disclosure
            </h2>
            <p className="mt-3">
              We may share your data with: service providers who help us run our business (e.g. hosting, email, scheduling tools such as Cal.com); professional advisers where required; and regulators or authorities when we are legally required to do so. We do not sell your personal data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              6. Data retention
            </h2>
            <p className="mt-3">
              We keep your data only for as long as needed to provide our services, meet legal and regulatory requirements (e.g. tax and accounting records), and handle disputes. When we no longer need it, we delete or anonymise it securely.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              7. Your rights (UK)
            </h2>
            <p className="mt-3">
              Under UK data protection law you have the right to: access your data; have it corrected; request erasure in certain cases; restrict or object to processing; and data portability where applicable. You may also have the right to complain to the Information Commissioner&apos;s Office (ICO). To exercise any of these rights, contact us using the details below.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              8. Cookies and similar technology
            </h2>
            <p className="mt-3">
              Our website may use cookies and similar technologies to improve functionality and analyse use. You can adjust your browser settings to refuse or limit cookies; some features may not work as intended if you do.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              9. Security
            </h2>
            <p className="mt-3">
              We put in place appropriate technical and organisational measures to protect your personal data against unauthorised access, loss or misuse. No method of transmission over the internet is completely secure; we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              10. Changes to this policy
            </h2>
            <p className="mt-3">
              We may update this privacy policy from time to time. The &quot;Last updated&quot; date at the top will change when we do. We encourage you to review this page periodically.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              11. Contact us
            </h2>
            <p className="mt-3">
              For any questions about this privacy policy or your personal data, please contact us at the email address on our website (tryfigures.com) or via the contact details provided there.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

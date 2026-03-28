import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { LayoutWrapper } from "@/components/LayoutWrapper";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tryfigures.com"),
  title: {
    default: "Figures Chartered Accountants | Oddly Satisfying Accounting",
    template: "%s | Figures Chartered Accountants",
  },
  description:
    "UK accounting and advisory for founders and small businesses. Plain English, same-day response, transparent pricing. Surrey-based.",
  keywords: ["accounting", "advisory", "UK", "small business", "founders", "VAT", "payroll", "tax"],
  icons: {
    icon: "/figures-favicon.ico",
    apple: "/figures-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtmScript = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KTHH2BS4');`;

  return (
    <html lang="en" className={plusJakarta.variable}>
      <head>
        <script
          type="text/javascript"
          charSet="UTF-8"
          src="https://cdn.cookie-script.com/s/eb65a2062c7ccdde1707b9f7ba62d907.js"
        />
        <script dangerouslySetInnerHTML={{ __html: gtmScript }} />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KTHH2BS4"
            height={0}
            width={0}
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-finance-inter",
});

export default function FinanceDashboardLayout({ children }: { children: React.ReactNode }) {
  return <div className={inter.variable}>{children}</div>;
}

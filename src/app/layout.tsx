import type { Metadata } from "next";
import "./globals.css";
import "@/components/stats/stats.css";
import "@/components/stats/stats-year.css";
import "@/components/stats/stats-responsive.css";
import "@/components/stats/stats-desktop.css";
import "@/components/stats/stats-empty.css";
import "@/components/weight-record/weight-record.css";
import "@/components/weight-record/weight-record-modal.css";
import "@/components/weight-record/weight-record-responsive.css";
import "@/components/weight-record/weight-record-modal-responsive.css";

export const metadata: Metadata = {
  title: "FitLog",
  description: "健身管理紀錄平台",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}

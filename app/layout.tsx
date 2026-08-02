import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LIC Agent Mukesh Gupta | Gupta Enterprises",
  description: "Personal LIC planning and policy servicing support from Mukesh Gupta at Gupta Enterprises, Kuchaikote, Gopalganj.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/assets/lic-logo.png",
    shortcut: "/assets/lic-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

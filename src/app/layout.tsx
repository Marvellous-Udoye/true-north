import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "TrueNorth Talent Advisory",
    template: "%s | TrueNorth Talent Advisory",
  },
  description:
    "TrueNorth Talent Advisory delivers executive search, strategic recruitment, and tailored talent solutions for companies and professionals across technology, operations, and professional services.",
  icons: {
    icon: [
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: "/apple-touch-icon.png",
  },
  keywords: [
    "TrueNorth Talent Advisory",
    "executive search",
    "strategic recruitment",
    "talent advisory",
    "talent recruitment agency",
    "career consultation",
    "resume review",
    "interview coaching",
    "job placement",
  ],
  authors: [{ name: "TrueNorth Talent Advisory" }],
  creator: "TrueNorth Talent Advisory",
  publisher: "TrueNorth Talent Advisory",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.truenorth.talent/",
    siteName: "TrueNorth Talent Advisory",
    title: "TrueNorth Talent Advisory | Talent Recruitment Agency",
    description:
      "Strategic recruitment, executive search, and career services for companies and professionals. Navigate the talent landscape with TrueNorth.",
  },
  applicationName: "TrueNorth Talent Advisory",
  category: "Human Resources Services",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}

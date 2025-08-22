import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ayubzai Business Solutions | Digital Marketing Specialist | Lincoln, NE",
  description: "Remote digital marketing specialist and custom web developer based in Lincoln, Nebraska. Serving businesses statewide and nationwide with strategic marketing solutions and custom development.",
  keywords: "digital marketing consultant Nebraska, remote web developer Lincoln NE, digital marketing specialist, custom web development nationwide, SEO consultant Nebraska, branding specialist Lincoln, email marketing freelancer, remote marketing consultant United States, Ayub Zaib Business Solutions",
  authors: [{ name: "Adib Ayubzai" }],
  creator: "Adib Ayubzai",
  publisher: "Ayubzai Business Solutions",
  metadataBase: new URL("https://www.ayubzaibusinesssolutions.com"),
  alternates: {
    canonical: "https://www.ayubzaibusinesssolutions.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.ayubzaibusinesssolutions.com",
    siteName: "Ayubzai Business Solutions",
    title: "Ayubzai Business Solutions | Digital Marketing Specialist | Lincoln, NE",
    description: "Remote digital marketing specialist and custom web developer based in Lincoln, Nebraska. Serving businesses statewide and nationwide with strategic marketing solutions.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ayubzai Business Solutions - Digital Marketing Specialist - Lincoln, Nebraska",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayubzai Business Solutions  | Digital Marketing Specialist | Lincoln, NE",
    description: "Remote digital marketing specialist and custom web developer based in Lincoln, Nebraska. Serving businesses statewide and nationwide.",
    images: ["/twitter-card.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add when you get these verification codes:
    // google: "your-google-verification-code",
    // bing: "your-bing-verification-code",
  },
  category: "Professional Services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Additional meta tags that can't be set in metadata */}
        <meta name="geo.region" content="US-NE" />
        <meta name="geo.placename" content="Lincoln, Nebraska" />
        <meta name="geo.position" content="40.8136;-96.7026" />
        <meta name="ICBM" content="40.8136, -96.7026" />
        <meta name="business.type" content="Professional Services" />
        <meta name="business.service_area" content="United States" />
        <meta name="profession" content="Digital Marketing Specialist" />
        <meta name="service.type" content="Remote Digital Marketing Services" />
        <meta name="service.area" content="United States, Nebraska" />
        <meta name="freelancer" content="true" />
        <meta name="remote.work" content="true" />
        <meta name="brand" content="Ayubzai Business Solutions " />
        <meta name="owner" content="Adib Ayubzai" />
        <meta name="company" content="Ayubzai Business Solutions " />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
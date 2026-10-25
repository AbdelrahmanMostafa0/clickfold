import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, DM_Sans, IBM_Plex_Mono } from "next/font/google";
import GoogleOAuthWrapper from "@/components/GoogleOAuthWrapper";
import { UserProvider } from "@/context/UserContext";
import Navbar from "@/components/navigations/Navbar";
import Footer from "@/components/navigations/Footer";
import { GoeyToasterProvider } from "@/components/ui/goey-toaster";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
} from "@/lib/metadata";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f4f6fc",
};

export const metadata: Metadata = {
  metadataBase: SITE_URL,
  applicationName: SITE_NAME,
  title: {
    default: "Clickfold — Campaign-Ready Short Links",
    template: "%s | Clickfold",
  },
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: "/" },
  referrer: "origin-when-cross-origin",
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Clickfold — Campaign-Ready Short Links",
    description: DEFAULT_DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clickfold — Campaign-Ready Short Links",
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${bricolage.variable} ${dmSans.variable} ${plexMono.variable}`}>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <GoogleOAuthWrapper>
          <UserProvider>
            <Navbar />
            {children}
            <GoeyToasterProvider />
            <Footer />
          </UserProvider>
        </GoogleOAuthWrapper>
      </body>
    </html>
  );
}

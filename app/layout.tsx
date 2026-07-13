import type { Metadata } from "next";
import { Bebas_Neue, IBM_Plex_Mono } from "next/font/google";
import GoogleOAuthWrapper from "@/components/GoogleOAuthWrapper";
import { UserProvider } from "@/context/UserContext";
import "./globals.css";
import Navbar from "@/components/navigations/Navbar";
import Footer from "@/components/navigations/Footer";
import { GoeyToasterProvider } from "@/components/ui/goey-toaster";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-display",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LinkPulse — Link Management & Campaign Analytics",
  description:
    "Shorten links, organize them into campaigns, and see every click in real time. Geo, device, and referrer analytics built in.",
  openGraph: {
    title: "LinkPulse — Link Management & Campaign Analytics",
    description:
      "Shorten links, organize them into campaigns, and see every click in real time. Geo, device, and referrer analytics built in.",
    images: ["/og-image.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LinkPulse — Link Management & Campaign Analytics",
    description:
      "Shorten links, organize them into campaigns, and see every click in real time. Geo, device, and referrer analytics built in.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${bebasNeue.variable} ${ibmPlexMono.variable} antialiased`}
      >
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

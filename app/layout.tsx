import type { Metadata } from "next";
import { Bebas_Neue, IBM_Plex_Mono } from "next/font/google";
import GoogleOAuthWrapper from "@/components/GoogleOAuthWrapper";
import "./globals.css";
import Navbar from "@/components/navigations/Navbar";
import Footer from "@/components/navigations/Footer";

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
  title: "b8lnk — Make them click. Make them regret.",
  description:
    "Create bait links that look sus, go anywhere. Perfect for pranks, social experiments, and chaos.",
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
          <Navbar />
          {children}
          <Footer />
        </GoogleOAuthWrapper>
      </body>
    </html>
  );
}

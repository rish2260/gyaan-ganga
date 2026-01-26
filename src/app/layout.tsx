import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import SoundControl from "@/components/SoundControl";
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
  title: "Gyaan Ganga Hackathon 2026 | Innovate. Code. Dominate.",
  description: "Join India's most immersive tech experience. 7 tracks, ₹1,00,000+ in rewards, and a national community of developers.",
  keywords: "hackathon, gyaan ganga, coding, innovation, tech event, india hackathon, developers, 3d website",
  authors: [{ name: "Gyaan Ganga Team" }],
  openGraph: {
    title: "Gyaan Ganga Hackathon 2026",
    description: "Innovate. Code. Dominate.",
    url: "https://gyaanganga.com",
    siteName: "Gyaan Ganga Hackathon",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground transition-colors duration-300`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <SoundControl />
        </ThemeProvider>
      </body>
    </html>
  );
}

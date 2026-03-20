import { Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Kiract | Cinema & Tech Talent Management",
  description:
    "Kiract is a management agency connecting global brands with elite cinema, film, and tech creators. Partner with viral film influencer @roldaniel5.",
  keywords:
    "cinema influencer, film content creator, tiktok movie critic, tech brand partnerships, creator management agency, @roldaniel5, movie trivia influencer",
  authors: [{ name: "Kiract Agency" }],
  metadataBase: new URL("https://www.kiract.com"),
  openGraph: {
    type: "website",
    url: "https://www.kiract.com/",
    title: "Kiract | Cinema & Tech Talent Management",
    description:
      "Connecting world-class brands with highly engaged cinema audiences through organic storytelling and viral content.",
    images: ["/preview-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kiract | Cinema & Tech Talent Management",
    description:
      "Connecting world-class brands with highly engaged cinema audiences through organic storytelling and viral content.",
    images: ["/preview-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sora.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}

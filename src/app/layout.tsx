import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Amarea - Wedding Planner de Luxe",
  description: "Créateur de mariages d'exception. Wedding planner de luxe pour des cérémonies inoubliables.",
  keywords: "wedding planner, mariage, luxe, cérémonie, événement",
  authors: [{ name: "Amarea" }],
  openGraph: {
    title: "Amarea - Wedding Planner de Luxe",
    description: "Créateur de mariages d'exception. Wedding planner de luxe pour des cérémonies inoubliables.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="font-sans antialiased bg-luxury-white text-luxury-black">
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

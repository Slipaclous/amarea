import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-luxury-white text-luxury-black">
        {children}
      </main>
      <Footer />
    </>
  );
}


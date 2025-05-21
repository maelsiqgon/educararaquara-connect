
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroBanner from "@/components/HeroBanner";
import FeaturesSection from "@/components/FeaturesSection";
import NewsSection from "@/components/NewsSection";
import ProfilesSection from "@/components/ProfilesSection";
import AppSection from "@/components/AppSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroBanner />
        <FeaturesSection />
        <ProfilesSection />
        <NewsSection />
        <AppSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

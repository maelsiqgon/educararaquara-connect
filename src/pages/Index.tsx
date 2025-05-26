
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroBanner from "@/components/HeroBanner";
import FeaturesSection from "@/components/FeaturesSection";
import NewsSection from "@/components/NewsSection";
import ProfilesSection from "@/components/ProfilesSection";
import AppSection from "@/components/AppSection";
import ContactSection from "@/components/ContactSection";
import SchoolsSection from "@/components/SchoolsSection";
import Chatbot from "@/components/Chatbot";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroBanner />
        <FeaturesSection />
        <SchoolsSection />
        <ProfilesSection />
        <NewsSection />
        <AppSection />
        <ContactSection />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;


import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroBanner from "@/components/HeroBanner";
import FeaturesSection from "@/components/FeaturesSection";
import RealNewsSection from "@/components/RealNewsSection";
import ProfilesSection from "@/components/ProfilesSection";
import AppSection from "@/components/AppSection";
import ContactSection from "@/components/ContactSection";
import RealSchoolsSection from "@/components/RealSchoolsSection";
import Chatbot from "@/components/Chatbot";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroBanner />
        <FeaturesSection />
        <RealSchoolsSection />
        <ProfilesSection />
        <RealNewsSection />
        <AppSection />
        <ContactSection />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;

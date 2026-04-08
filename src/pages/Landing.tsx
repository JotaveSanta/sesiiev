import { useNavigate } from "react-router-dom";
import { LandingHeader } from "@/components/LandingHeader";
import { HeroSection } from "@/components/HeroSection";
import { TeamSection } from "@/components/TeamSection";
import { AboutSection } from "@/components/AboutSection";
import { Footer } from "@/components/Footer";

const Landing = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/curso");
  };

  return (
    <div className="min-h-screen bg-background">
      <LandingHeader onStart={handleStart} />
      <HeroSection onStart={handleStart} />
      <TeamSection />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Landing;

import MinecraftFeatures from "./AboutSection/page";
import HeroSection from "./HeroSection/page";
import ServerRules from "./Rules/page";
import StaffSection from "./StaffSection/page";

export default function Home() {
  return (
  <div>
    <HeroSection/>
    <MinecraftFeatures/>
    <StaffSection/>
    <ServerRules/>
  </div>
  );
}

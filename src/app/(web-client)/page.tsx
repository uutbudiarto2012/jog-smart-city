import HomeHero from "@/components/home/hero";
import HomeHowToEarn from "@/components/home/how-to-earn";
import InvestmentZones from "@/components/home/investment-zones";
import MapPreview from "@/components/home/map-preview";
import WhatIsDigitalLand from "@/components/home/what-is-digital-land";
import WhyDigitalLand from "@/components/home/why-digital-land";
export default function Home() {
  return (
    <>
      <HomeHero />
      <MapPreview />
      <WhatIsDigitalLand />
      <HomeHowToEarn />
      <InvestmentZones />
      <div className="border border-slate-300/50 dark:border-green-800/20 relative z-30" />
      <WhyDigitalLand />
    </>
  );
}

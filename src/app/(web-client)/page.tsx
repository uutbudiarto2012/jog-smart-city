import HomeHero from "@/components/home/hero";
import HomeHowToEarn from "@/components/home/how-to-earn";
import InvestmentZones from "@/components/home/investment-zones";
import WhatIsDigitalLand from "@/components/home/what-is-digital-land";
import WhyDigitalLand from "@/components/home/why-digital-land";
import MainMap from "../map/components/main-map";
export default function Home() {
  return (
    <>
      <HomeHero />
      <MainMap />
      <WhatIsDigitalLand />
      <HomeHowToEarn />
      <InvestmentZones />
      <div className="border border-slate-300/50 dark:border-green-800/20 relative z-30" />
      <WhyDigitalLand />
    </>
  );
}

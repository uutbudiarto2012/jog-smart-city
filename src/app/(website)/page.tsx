import CardAds from "./(home)/card-ads";
import Hero from "./(home)/hero";
import LocationMap from "./(home)/location-map";
import WhyBuild from "./(home)/why-build";

export default function Home() {
  return (
    <>
      <Hero />
      <CardAds />
      <WhyBuild />
      <LocationMap />
    </>
  );
}

import Hero from "@/components/sections/Hero";
import Ticker from "@/components/sections/Ticker";
import About from "@/components/sections/About";
import SignatureMenu from "@/components/sections/SignatureMenu";
import Experience from "@/components/sections/Experience";
import Challenge from "@/components/sections/Challenge";
import Chef from "@/components/sections/Chef";
import Gallery from "@/components/sections/Gallery";
import CelebrityWall from "@/components/sections/CelebrityWall";
import Instagram from "@/components/sections/Instagram";
import Visit from "@/components/sections/Visit";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Ticker />
      <About />
      <SignatureMenu />
      <Experience />
      <Challenge />
      <Chef />
      <Gallery />
      <CelebrityWall />
      <Instagram />
      <Visit />
    </>
  );
}

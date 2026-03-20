import { ArrowRight } from "lucide-react";
import VideoCard from "./components/VideoCard";

export default function Home() {
  // Custom colors matching the new palette
  const bgColor = "bg-[#F7F5F0]";
  const brandDark = "text-[#95B2B2]"; // Soft teal/blue-grey
  const brandRed = "text-[#5E7A7A]"; // Darker teal for highlights
  const mutedText = "text-[#8B837E]";
  const gridLine = "border-[#E8E4DB]";

  return (
    <div
      className={`min-h-screen ${bgColor} font-sans overflow-x-hidden text-[#95B2B2] relative selection:bg-[#95B2B2] selection:text-[#F7F5F0]`}
    >
      {/* Background grid lines */}
      <div className="absolute inset-0 pointer-events-none z-0 flex justify-between px-4 md:px-12 w-full max-w-[1600px] mx-auto opacity-40">
        <div className={`w-px h-full border-l ${gridLine}`} />
        <div className={`w-px h-full border-l ${gridLine} hidden md:block`} />
        <div className={`w-px h-full border-l ${gridLine} hidden lg:block`} />
        <div className={`w-px h-full border-l ${gridLine}`} />
      </div>

      {/* Hero section */}
      <section className="relative w-full h-[75vh] md:h-[85vh] max-w-[1600px] mx-auto flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#95B2B2]/140 mix-blend-multiply z-10" />
          <img
            src="https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop"
            alt="Cinematic Creator Silhouette"
            className="w-full h-full object-cover grayscale contrast-125"
          />
        </div>

        <div className="relative z-20 flex flex-col items-center justify-center px-6 md:px-12 text-center pointer-events-none">
          <h1 className="text-[18vw] md:text-[15vw] font-black tracking-tighter uppercase leading-[0.85] text-[#F7F6F1] drop-shadow-2xl">
            CINEMA
          </h1>
          <h1 className="text-[18vw] md:text-[15vw] font-black tracking-tighter uppercase leading-[0.85] text-[#95B2B2] drop-shadow-2xl">
            KIRACT
          </h1>
          <p className="mt-6 text-[#F7F6F1] text-lg md:text-2xl font-medium tracking-wide max-w-2xl drop-shadow-lg">
            Connecting brands with the new voice of cinema.
          </p>
        </div>
      </section>

      <hr className={`border-t ${gridLine} relative z-10 max-w-[1600px] mx-auto`} />

      {/* About section */}
      <section className="relative z-10 py-24 px-6 md:px-12 max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
        <div className="hidden lg:block lg:w-5/12 aspect-square relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1666698809123-44e998e93f23?q=80&w=2056&auto=format&fit=crop"
            alt="Creator in Studio"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full lg:w-7/12 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#95B2B2]" />
            <span className="text-sm font-bold uppercase tracking-widest">
              About Kiract
            </span>
          </div>

          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.1] ${brandDark}`}
          >
            We&apos;re a management agency helping brands create impactful
            campaigns through organic storytelling.
          </h2>

          <p
            className={`text-2xl md:text-3xl font-medium leading-[1.2] ${mutedText}`}
          >
            Our mission is to connect brands with influential voices that drive
            real engagement, trust, and measurable growth in the film and tech
            space.
          </p>

          {/* <a
            href="#roster"
            className="group mt-8 flex items-center gap-2 text-sm font-bold uppercase tracking-widest border-b border-[#95B2B2] pb-1 w-fit hover:text-[#5E7A7A] hover:border-[#5E7A7A] transition-colors"
          >
            Our Full Story
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a> */}
        </div>
      </section>

      <hr className={`border-t ${gridLine} relative z-10 max-w-[1600px] mx-auto`} />

      {/* Featured talent section */}
      <section
        id="roster"
        className="relative z-10 py-24 px-6 md:px-12 max-w-[1600px] mx-auto bg-[#95B2B2] text-[#F7F5F0]"
      >
        <div className="flex items-center gap-3 mb-16">
          <div className="w-2 h-2 rounded-full bg-[#F7F5F0]" />
          <span className="text-sm font-bold uppercase tracking-widest text-[#F7F5F0]">
            Featured Talent
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="col-span-1 lg:col-span-5 flex flex-col gap-6">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter">
              @roldaniel5
            </h2>
            <p className="text-xl md:text-2xl font-light text-[#E8E4DB]">
              The Cinema Insider. Blending industry expertise with authentic fan
              engagement.
            </p>
            <div className="flex gap-4 mt-4">
              <a
                href="https://www.tiktok.com/@roldaniel5"
                target="_blank"
                rel="noreferrer"
                className="bg-[#5E7A7A] px-4 py-2 rounded-sm text-sm font-bold uppercase tracking-wider hover:bg-[#4D6969] transition-colors"
              >
                TikTok: 41K+
              </a>
              <a
                href="https://www.instagram.com/roldaniel.cine"
                target="_blank"
                rel="noreferrer"
                className="bg-[#5E7A7A] px-4 py-2 rounded-sm text-sm font-bold uppercase tracking-wider hover:bg-[#4D6969] transition-colors"
              >
                Insta: 17K+
              </a>
            </div>

            {/* Integrated Stats Grid */}
            <div className="grid grid-cols-2 gap-8 mt-8 border-t border-[#F7F5F0]/20 pt-8">
              <div className="flex flex-col gap-1">
                <h3 className="text-4xl md:text-5xl font-bold tracking-tighter text-[#F7F5F0]">
                  8.5M+
                </h3>
                <p className="text-[#E8E4DB] font-medium text-xs uppercase tracking-widest opacity-80">
                  Monthly Reach
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-4xl md:text-5xl font-bold tracking-tighter text-[#F7F5F0]">
                  46%
                </h3>
                <p className="text-[#E8E4DB] font-medium text-xs uppercase tracking-widest opacity-80">
                  Ages 25-34
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-4xl md:text-5xl font-bold tracking-tighter text-[#F7F5F0]">
                  2.6M
                </h3>
                <p className="text-[#E8E4DB] font-medium text-xs uppercase tracking-widest opacity-80">
                  Peak Views
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-4xl md:text-5xl font-bold tracking-tighter text-[#F7F5F0]">
                  90%
                </h3>
                <p className="text-[#E8E4DB] font-medium text-xs uppercase tracking-widest opacity-80">
                  Non-Follower Reach
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-1 lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <VideoCard
              title="Este es el pingüino que yo quería ser de niño..."
              views="67 mil Views"
              embedSrc="https://www.instagram.com/reel/DT6G8JpjCMK/embed"
            />

            <VideoCard
              title="Adivina la película con 5 imágenes pt.3!"
              views="2.6M Views"
              embedSrc="https://www.tiktok.com/player/v1/7570438010798427414"
            />
          </div>
        </div>
      </section>

      {/* Footer / CTA */}
      <footer
        id="contact"
        className="relative z-10 py-32 px-6 md:px-12 max-w-[1600px] mx-auto text-center flex flex-col items-center gap-8"
      >
        <h2 className={`text-4xl md:text-6xl font-black tracking-tighter ${brandDark}`}>
          Ready to scale your brand?
        </h2>
        <p className={`text-xl ${mutedText} max-w-2xl`}>
          Contact us to request @roldaniel5&apos;s full media kit and discuss custom
          integration packages.
        </p>
        <a
          href="mailto:partnerships@kiract.com"
          className="mt-6 bg-[#95B2B2] text-[#F7F5F0] px-12 py-5 text-lg font-bold uppercase tracking-widest hover:bg-[#5E7A7A] transition-colors"
        >
          Email Kiract
        </a>
        <p className="mt-12 text-sm font-semibold uppercase tracking-widest text-[#8B837E]">
          partnerships@kiract.com
        </p>
      </footer>
    </div>
  );
}

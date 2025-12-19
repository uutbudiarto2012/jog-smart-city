import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-screen relative w-full overflow-hidden">
      <div className="absolute left-0 right-0 top-0 bottom-0 z-0 overflow-hidden">
        <Image
          className="h-full w-full object-cover object-right-bottom kenburns-top-right"
          priority
          width={1280}
          height={832}
          src={'/images/home.png'}
          alt="hero kulonprogo smart city"
        />
      </div>
      <div className="absolute left-0 right-0 top-0 bottom-0 z-10  bg-gradient-to-r from-[#001c01] via-[#003301]/20 to-transparent">
        <div className="container mx-auto px-3 h-full flex flex-col justify-center">
          <div className="max-w-2xl text-white space-y-3">
            <h1 className="text-center md:text-start text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold drop-shadow">
              Java Smart City <br />
              & Cultural Park <br />
              Development
            </h1>
            <p className="md:text-lg text-center md:text-start ">KULONPROGO, YOGYAKARTA - INDONESIA</p>
            <div className="flex justify-center md:justify-start">
              <Button size={'lg'} className="rounded-xl" asChild>
                <Link href={'/map'}>
                  <Icon name="carbon:heat-map" />
                  Open The Land
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="h-12 w-[150px] bg-[#003F01] absolute z-30 bottom-0 -left-12 rounded-full" /> */}
    </section >
  )
}

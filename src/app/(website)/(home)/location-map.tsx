import Image from 'next/image'

export default function LocationMap() {
  return (
    <section className="relative w-full overflow-hidden border-t-4 border-t-[#007602]">
      <div className="container px-3 mx-auto">
        <div className="grid text-white items-center md:grid-cols-2 py-12 lg:py-20 gap-6 relative z-10">
          <div className="relative max-w-3xl mx-auto rounded-3xl overflow-hidden">
            <Image
              className="h-full w-full object-contain"
              priority
              width={1280}
              height={832}
              src={'/images/location-map.png'}
              alt="hero kulonprogo smart city"
            />
          </div>
          <div>
            <h2 className='text-center md:text-start text-5xl lg:text-6xl font-bold drop-shadow'>
              Location
            </h2>
            <div className='space-y-2 mt-8 text-base md:text-lg'>
              <p>
                Project Name: Java Smart City & Cultural Park
              </p>
              <p>
                Location: Pantai Bugel, Kulon Progo, Special Region of Y ogyakarta
              </p>
              <p>
                Total Land Area: 90 hectares
              </p>
              <p>
                Land Ownership: Freehold (SHM) land belonging to the Kadipaten Puro Pakualaman
              </p>
              <p>
                Development Model: Long-term Build-Operate-T ransfer (BOT), ensuring legal security until full ROI is achieved.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute left-0 right-0 top-0 bottom-0 z-0 overflow-hidden">
        <Image
          className="h-full w-full object-cover object-right-bottom"
          priority
          width={1280}
          height={832}
          src={'/images/yia.png'}
          alt="hero kulonprogo smart city"
        />
      </div>
      <div className='absolute bg-gradient-to-l from-[#003F01] via-[#007602]/50 to-transparent top-0 bottom-0 left-0 right-0'></div>
    </section>
  )
}

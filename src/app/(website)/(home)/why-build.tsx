import { Icon } from '@/components/icon'
import { GlowingEffect } from '@/components/ui/glowing-effect'
import Image from 'next/image'
import React from 'react'

export default function WhyBuild() {
  return (
    <section className='relative min-h-screen text-white overflow-hidden'>
      {/* <div className="h-10 w-[200px] bg-[#003F01] absolute z-30 top-0 -left-10 rounded-full"></div> */}
      <div className="absolute left-0 right-0 top-0 bottom-0 z-0 overflow-hidden">
        <Image
          className="h-full w-full object-cover"
          priority
          fill
          src={'/images/prambanan-1.png'}
          alt="candi prambanan"
        />
      </div>
      <div className='relative md:absolute flex items-center left-0 right-0 top-0 bottom-0 z-10  bg-gradient-to-br from-[#001c01] via-[#003301]/50 to-transparent'>
        <div className="container mx-auto px-3 py-10 md:py-20">
          <h2 className='text-center md:text-start text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow'>Why we built this ?</h2>
          <div className="grid md:grid-cols-2 my-12 gap-4 items-start">
            <div className="space-y-3 text-sm md:text-xl max-w-lg">
              <p>
                The objectives of Java Smart City & Cultural Park Development go
                beyond cultural preservation.
              </p>
              <p>
                This project is designed to safeguard Javanese heritage while also
                driving regional economic growth, creating diversified commercial
                revenue streams, and positioning Kulon Progo as a strategic tourism
                hub powered by its proximity to Y ogyakarta International Airport (YIA).
              </p>
            </div>
            <div className='grid grid-cols-2 lg:grid-cols-3 gap-2'>
              <CardItem
                icon="game-icons:island"
                title='Theme Park'
                text="Dioramas, parades, rides themed after Java`s kingdoms."
              />
              <CardItem
                icon="cbi:paramount"
                title='Resorts'
                text="Luxury beachfront, villas, glamping, convention center."
              />
              <CardItem
                icon="streamline-flex:health-care-2-remix"
                title='Healthcare'
                text="International clinic, wellness retreat."
              />
              <CardItem
                icon="vaadin:golf"
                title='Golf'
                text="9-hole oceanfront course."
              />
              <CardItem
                icon="fa7-solid:store-alt"
                title='Commercial'
                text="Retail village, F&B clusters, cultural marketplace."
              />
              <CardItem
                icon="material-symbols:garage-money"
                title='Business & Logistics'
                text="Offices, distribution, and digital data hub."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const CardItem = ({ icon, title, text }: { icon: string, title: string, text: string }) => {
  return (
    <div className='p-4 rounded-2xl border-t-4 border border-green-600/50 border-t-[#007602] bg-gradient-to-tr from-[#003F01] to-transparent  backdrop-blur relative'>
      <GlowingEffect
        blur={0}
        borderWidth={3}
        spread={80}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
      />
      <div>
        <Icon className='text-3xl' name={icon} />
      </div>
      <h2 className='text-base md:text-base font-semibold'>{title}</h2>
      <div className='text-sm md:text-sm'>{text}</div>
    </div>
  )
}

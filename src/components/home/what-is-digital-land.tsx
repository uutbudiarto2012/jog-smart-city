import Image from 'next/image'
import { Icon } from '../icon'
import { GlowingEffect } from '../ui/glowing-effect'
import { cn } from '@/lib/utils'
// import BgDigitalLand from './bg-digital-land'

export default function WhatIsDigitalLand() {
  return (
    <section className='py-8 md:py-16 lg:py-24 relative text-primary'>
      <div className="overflow-hidden hidden md:block absolute -left-1/4 top-0 bottom-0 -rotate-90">
        <Image
          className={cn(
            "h-full w-full object-contain blur-3xl dark:blur-xl object-bottom opacity-50 dark:opacity-20",
          )}
          priority
          width={1536}
          height={1024}
          src={'/img/ill-5.png'}
          alt="what-is-digital-land"
        />
      </div>
      {/* <BgDigitalLand /> */}
      <div className="absolute z-10 left-0 top-0 right-0 bottom-0" />
      <div className="container relative z-20">
        <div className='max-w-xl space-y-4'>
          <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold'>What Is Digital Land?</h2>
          <p>
            Digital Land represents an on-chain economic participation right mapped to real-world assets inside the Jogja Smart City masterplan.
          </p>
        </div>
        <div className='mt-12 space-y-12'>
          <div className="grid md:grid-cols-3 gap-4">
            <div className='md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4'>
              <CardItem
                icon='streamline-ultimate:kindle-hold-bold'
                text='Economic Participation Rights'
              />
              <CardItem
                icon='ph:park-bold'
                text='Zone-Specific Exposure'
              />
              <CardItem
                icon='gravity-ui:copy-transparent'
                text='On-Chain Transparency'
              />
              <CardItem
                icon='tabler:file-code-filled'
                text='No land title (SHM)'
              />
              <CardItem
                icon='carbon:ai-governance-untracked'
                text='No governance risk'
              />
              <CardItem
                icon='hugeicons:task-remove-02'
                text='No operational responsibility'
              />
            </div>
          </div>
          <p className='italic text-2xl sm:text-3xl md:text-4xl'>
            “We tokenize VALUE, not LAND”
          </p>
        </div>
      </div>
      <div className="overflow-hidden blur-xl opacity-50 md:opacity-80 md:blur-0 md:w-1/3 absolute rounded-s-3xl right-0 top-0 bottom-0">
        <Image
          className={cn(
            "h-full w-full object-cover object-bottom opacity-50 dark:opacity-100",
          )}
          priority
          width={1536}
          height={1024}
          src={'/img/ill-1.png'}
          alt="what-is-digital-land"
        />
      </div>
    </section>
  )
}


const CardItem = ({ icon, text }: { icon: string, text: string }) => {
  return (
    <div className='p-2 relative md:p-4 border border-t-2 rounded-2xl backdrop-blur-lg text-black bg-gradient-to-br from-white/20 via-white/40 to-white dark:from-black/10 dark:via-black/20 dark:to-black/20'>
      <GlowingEffect
        spread={80}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.1}
      />
      <div className="overflow-hidden w-1/3 absolute rounded-s-3xl blur right-0 top-0 bottom-0 z-10">
        <Image
          className={cn(
            "h-full w-full object-cover object-bottom opacity-0 grayscale dark:grayscale-0 dark:opacity-100",
          )}
          priority
          width={1536}
          height={1024}
          src={'/img/ill-1.png'}
          alt="what-is-digital-land"
        />
      </div>
      <div className='relative z-10'>
        <div className="h-12 w-12 flex items-center justify-center bg-[#003F01]/80 rounded-full">
          <Icon className='text-2xl text-[#FFF]' name={icon} />
        </div>
        <div className='text-sm md:text-base lg:text-lg font-medium mt-4 text-[#003F01] dark:text-white'>
          {text}
        </div>
      </div>
    </div>
  )
}

import Link from 'next/link'
import { Icon } from '../icon'
import { Button } from '../ui/button'
import BgHero from './bg-hero'

export default function HomeHero() {
  return (
    <section className='min-h-screen relative overflow-hidden'>
      <BgHero />
      <div className="absolute left-0 right-0 top-0 bottom-0 z-10  bg-gradient-to-t from-transparent via-[#002c01]/40 to-tranfrom-transparent">
        <div className="container h-full flex flex-col justify-center">
          <div className="max-w-2xl rounded-3xl  text-white space-y-3 mx-auto">
            <div className='text-center uppercase'>
              <div className='text-lg md:text-xl lg:text-4xl font-semibold'>THE</div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold drop-shadow">
                Java Smart City
              </h1>
            </div>
            <p className="text-sm md:text-lg lg:text-xl text-center font-semibold drop-shadow">
              Earn Real Cashflow
              from Yogyakarta`s Future City
              Without Owning Land
            </p>
            <p className="text-xs md:text-base text-center drop-shadow">
              Invest in Digital Land Parcels that represent real economic zones <br /> Data Centers · Resorts · Commercial Areas · Healthcare
            </p>
            <div className="flex justify-center">
              <Button size={'lg'} className="rounded-xl" asChild>
                <Link href={'/map'}>
                  <Icon name="proicons:book-add-2" />
                  Join as Early Investor
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import data from '@/data/investment-zone.json'
import InvestmentZoneItem from './investment-zone-item'
import Image from 'next/image'
export default function InvestmentZones() {
  return (
    <section className='relative'>
      <div className="left-0 right-0 top-0 bottom-0 absolute flex flex-col z-0">
        <div className='flex-1 absolute top-0 bottom-0 left-0 right-0  z-20 bg-gradient-to-b from-white via-white to-transparent dark:from-black dark:via-transparent dark:to-transparent'></div>
        <div className="relative z-10 flex-1">
          <Image
            className="w-full h-full object-cover object-bottom opacity-30 grayscale dark:grayscale-0 dark:opacity-30"
            fill alt="InvestmentZones"
            src={'/img/ill-2.png'}
          />
        </div>
      </div>
      <div className="container py-12 md:py-24 relative z-10">
        <div className='max-w-xl space-y-4'>
          <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold'>
            InvestmentZones
          </h2>
          <p>
            Choose from multiple cashflow-generating zones,
            each backed by real assets and sector-specific revenue streams.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 my-6 gap-4">
          {
            data.data.map((item, index) => (
              <InvestmentZoneItem key={index} {...item} />
            ))
          }
        </div>
      </div>
    </section>
  )
}

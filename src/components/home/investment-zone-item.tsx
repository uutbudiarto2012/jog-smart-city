import Image from 'next/image'
import Link from 'next/link'

type TInvestmentZoneItem = {
  title: string
  image: string
  description: string
}
export default function InvestmentZoneItem(props: TInvestmentZoneItem) {
  return (
    <Link href={'/'} className='shadow backdrop-blur p-2 md:p-4 rounded-xl md:rounded-3xl dark:border bg-white/50 dark:bg-black/50'>
      <div className="aspect-square relative rounded-xl overflow-hidden">
        <Image className="w-full h-full object-cover" fill alt="earn1" src={props.image || '/img/zones/data-center-zone.png'} />
      </div>
      <div className='pt-4'>
        <h2 className='text-lg md:text-xl font-semibold'>
          {props.title}
        </h2>
        <p className='line-clamp-3 text-xs md:text-sm'>
          {props.description}
        </p>
      </div>
    </Link>
  )
}

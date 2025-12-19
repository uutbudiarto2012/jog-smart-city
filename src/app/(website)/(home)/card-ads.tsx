import Image from 'next/image'
import React from 'react'

export default function CardAds() {
  return (
    <section className='py-12 bg-gradient-to-tr  from-[#003F01] via-[#003F01]/80 to-[#003F01]'>
      <div className="container px-3 mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-white">
          <CardItem
            img='/images/fasility/1.png'
            title='Lorem, ipsum dolor'
            text='Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis, ex!'
          />
          <CardItem
            img='/images/fasility/2.png'
            title='Lorem, ipsum dolor'
            text='Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis, ex!'
          />
          <CardItem
            img='/images/fasility/3.png'
            title='Lorem, ipsum dolor'
            text='Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis, ex!'
          />
          <CardItem
            img='/images/fasility/4.png'
            title='Lorem, ipsum dolor'
            text='Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis, ex!'
          />
        </div>
      </div>
    </section>
  )
}

const CardItem = ({ img, title, text }: { img: string, title: string, text: string }) => {
  return (
    <div>
      <div className='relative aspect-video overflow-hidden rounded-xl md:rounded-2xl'>
        <Image
          className="h-full w-full object-cover"
          priority
          fill
          src={img}
          alt="1"
        />
      </div>
      <div className='mt-2 md:mt-4'>
        <h2 className='line-clamp-1 font-semibold'>
          {title}
        </h2>
        <p className='line-clamp-2 text-sm'>{text}</p>
      </div>
    </div>
  )
}

import React from 'react'
import { Icon } from '../icon'
import Image from 'next/image'

export default function WhyDigitalLand() {
  return (
    <section className='relative min-h-screen'>
      <div className="left-0 right-0 top-0 bottom-0 absolute flex flex-col z-0">
        <div className='flex-1 absolute top-0 bottom-0 left-0 right-0  z-20 bg-gradient-to-t from-white via-white to-transparent dark:from-black dark:via-transparent dark:to-transparent'></div>
        <div className="relative z-10 flex-1">
          <Image
            className="w-full h-full object-cover object-top opacity-10 grayscale dark:grayscale-0 dark:opacity-20 dark:blur-lg"
            fill alt="InvestmentZones"
            src={'/img/ill-2.png'}
          />
        </div>
      </div>
      <div className="container relative z-20 py-12 md:py-24">
        <div className='max-w-xl space-y-4 text-center mx-auto'>
          <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold'>
            Why Digital Land?
          </h2>
          <p>
            Digital Land focuses on earning from real-world income, while NFT land focuses on resale-driven value appreciation.
          </p>
        </div>
        <div className="mt-12">
          <div className="flex items-center">
            <div className='flex-1'>
              <div className='flex items-center justify-center flex-col'>
                <div className='h-12 w-12 flex items-center justify-center relative'>
                  <div className="absolute left-0 right-0 bottom-0 top-0 rounded bg-black dark:bg-white rotate-45"></div>
                  <div className="relative z-10 text-white dark:text-black">
                    <Icon className='text-4xl' name='fontisto:island' />
                  </div>
                </div>
                <div className='mt-4 text-sm text-center md:text-xl font-semibold'>
                  Digital Land
                </div>
              </div>
            </div>
            <div className='text-center text-3xl md:text-5xl font-semibold'>VS</div>
            <div className='flex-1'>
              <div className='flex items-center justify-center flex-col'>
                <div className='h-12 w-12  flex items-center justify-center relative'>
                  <div className="absolute left-0 right-0 bottom-0 top-0 rounded bg-black dark:bg-white rotate-45"></div>
                  <div className="relative z-10 text-white dark:text-black">
                    <Icon className='text-4xl' name='ri:nft-line' />
                  </div>
                </div>
                <div className='mt-4 text-sm text-center md:text-xl font-semibold'>
                  NFT Land
                </div>
              </div>
            </div>
          </div>
          <div className='mt-12 space-y-1'>
            <VSItem
              text_1='Cashflow backed'
              text_2='Speculative value'
            />
            <VSItem
              text_1='Revenue based'
              text_2='Floor price driven'
            />
            <VSItem
              text_1='Exit via income'
              text_2='Exit via resale'
            />
            <VSItem
              text_1='No land dispute'
              text_2='Legal ambiguity'
            />
          </div>
        </div>
      </div>
    </section>
  )
}

const VSItem = (props: {
  text_1: string
  text_2: string
}) => {
  return (
    <div className="flex justify-center items-center">
      <div className="text-center flex-1 -mr-8 py-2 px-8 leading-tight md:px-6 bg-gradient-to-tr from-[#007602] via-[#007602] to-[#04CA05] text-white text-base md:text-lg font-semibold md:font-bold uppercase rounded-full">
        {props.text_1}
      </div>
      <div className='bg-gradient-to-r from-[#007602] to-cyan-400 w-16 h-16 flex items-center justify-center rounded-full z-10 relative'>
        <div className="absolute w-6 h-6 dark:bg-white z-0 blur rounded-full"></div>
        <div className="absolute w-4 h-4 dark:bg-white z-0 blur rounded-full"></div>
        <div className="absolute w-2 h-2 dark:bg-white z-0 blur rounded-full"></div>
        <Icon className='text-3xl z-10 text-white/50 dark:text-white' name='cuida:lamp-on-outline' />
      </div>
      <div className="text-center flex-1 -ml-8 py-2 px-8 leading-tight md:px-6 bg-gradient-to-tr from-cyan-300 via-cyan-500 to-cyan-300 text-white text-base md:text-lg font-semibold md:font-bold uppercase rounded-full">
        {props.text_2}
      </div>
    </div>
  )
}

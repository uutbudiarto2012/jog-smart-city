'use client'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

export default function BgHero() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) return null
  const heroSrc =
    resolvedTheme === 'light'
      ? '/img/hero-1.png'
      : '/img/hero-1-dark.png'
  return (
    <div className="absolute left-0 right-0 top-0 bottom-0 z-0 overflow-hidden">
      <Image
        className="h-full w-full object-cover object-top kenburns-top opacity-100 dark:opacity-80"
        priority
        width={1536}
        height={1024}
        src={heroSrc}
        alt="hero kulonprogo smart city"
      />
    </div>
  )
}

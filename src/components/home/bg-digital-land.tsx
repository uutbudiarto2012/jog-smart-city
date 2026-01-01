'use client'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

export default function BgDigitalLand() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) return null
  const heroSrc =
    resolvedTheme === 'light'
      ? '/img/ill-1.png'
      : '/img/ill-1.png'
  return (
    <div className="absolute left-0 right-0 top-0 bottom-0 z-0 overflow-hidden">
      <div className={cn(
        "absolute left-0 right-0 top-0 bottom-0 z-10 backdrop-blur dark:backdrop-blur-0"
      )}></div>
      <Image
        className={cn(
          "h-full w-full object-cover object-bottom ",
          resolvedTheme === "dark" ? "opacity-5" : "opacity-10"
        )}
        priority
        width={1536}
        height={1024}
        src={heroSrc}
        alt="what-is-digital-land"
      />
    </div>
  )
}

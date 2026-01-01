'use client'

import { Icon } from "@/components/icon"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useEffect, useState } from "react"
import { ModeToggle } from "../mode-toggle"

export default function MainNav() {
  const [lastScrollY, setLastScrollY] = useState(0)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])
  return (
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-40',
      'duration-500 transition-all',
      lastScrollY >= 200 ? 'bg-white/50 dark:bg-black/50 backdrop-blur-lg' : 'bg-transparent  text-white'
    )}>
      <div className="container">
        <div className={cn(
          "flex items-center",
          'duration-500 transition-all',
          lastScrollY >= 120 ? 'h-[70px]' : 'h-[100px] md:h-[120px]'
        )}>
          <div className="flex-1">
            <div className={cn(
              "relative duration-300 transition-all",
              lastScrollY >= 120 ? 'w-[120px] md:w-[120px] md:h-[34px]' : 'w-[130px] md:w-[200px] md:h-[57px]'
            )}>
              <Image
                className="h-full w-full object-contain"
                alt="logo kulon progo"
                src={'/logo.png'}
                width={256} height={73} />
            </div>
          </div>
          <div className="flex-1 flex justify-end items-center gap-x-2">
            <ModeToggle />
            <Button>
              <Icon name="solar:wallet-bold" /> Connect <span className="hidden md:inline">Wallet</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

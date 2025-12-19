'use client'

import { Icon } from "@/components/icon"
import { Button } from "@/components/ui/button"

export default function ReloadButton() {
  return (
    <Button
      onClick={() => window.location.reload()}
      size={'icon'}
    >
      <Icon name='mage:reload' />
    </Button>
  )
}

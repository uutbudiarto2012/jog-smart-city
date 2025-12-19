import { Icon } from '@/components/icon'
import { Button } from '@/components/ui/button'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import ReloadButton from './world/ReloadButton'

const WorldCanvas = dynamic(() => import('./world/WorldCanvas'), {
  ssr: false,
})

export default function MapPage() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <nav className='fixed top-0 left-0 right-0 z-10'>
        <div className="container mx-auto p-3  flex justify-between items-center">
          <Button asChild>
            <Link href={'/'}>
              <Icon name='material-symbols:home-outline-rounded' /> Home
            </Link>
          </Button>
          <ReloadButton />
        </div>
      </nav>
      <WorldCanvas />
    </div>
  )
}

import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function MainMap() {
  return (
    <section className='h-screen'>
      <div className="container px-3 mx-auto h-full flex flex-col items-center justify-center">
        <div className='flex flex-wrap gap-1 mb-2'>
          <Link href={'/map/sample-smartcity'} className="h-20 w-20 border flex items-center justify-center p-2 text-xs font-semibold text-center">
            Sample City
          </Link>
          <Link href={'/map/sample-restaurant'} className="h-20 w-20 border flex items-center justify-center p-2 text-xs font-semibold text-center">
            Sample Restaurant
          </Link>
        </div>
        <Button asChild>
          <Link href={'/'}>Back</Link>
        </Button>
      </div>
    </section>
  )
}

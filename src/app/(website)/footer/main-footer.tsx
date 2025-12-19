import { Icon } from "@/components/icon";
import Image from "next/image";
import Link from "next/link";

export default function MainFooter() {
  return (
    <footer className='py-8 bg-gradient-to-br border-t-4 border-[#007602] from-[#FFF] via-[#003F01]/40 to-[#003F01]'>
      <div className="container px-3 mx-auto">
        <div className="flex justify-between">
          <div className="w-52">
            <Image
              className="h-full w-full object-contain"
              alt="logo kulon progo"
              src={'/logo.png'}
              width={256} height={73} />
          </div>
          <div className="flex justify-end gap-x-4">
            <Link className="flex h-10 w-10 rounded-lg items-center justify-center bg-[#007602]" href="https://google.com" target="_blank" rel="noopener noreferrer">
              <Icon className="text-white text-2xl" name="basil:instagram-solid" />
            </Link>
            <Link className="flex h-10 w-10 rounded-lg items-center justify-center bg-[#007602]" href="https://google.com" target="_blank" rel="noopener noreferrer">
              <Icon className="text-white text-2xl" name="line-md:youtube" />
            </Link>
            <Link className="flex h-10 w-10 rounded-lg items-center justify-center bg-[#007602]" href="https://google.com" target="_blank" rel="noopener noreferrer">
              <Icon className="text-white text-2xl" name="ic:twotone-discord" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

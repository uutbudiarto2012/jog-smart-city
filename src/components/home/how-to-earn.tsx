import { cn } from "@/lib/utils"
import { Icon } from "../icon"
export default function HomeHowToEarn() {
  return (
    <section
      style={{
        backgroundImage: "url('/img/connect-land.png')",
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'top center',
      }}
      className='relative'>
      <div className="text-white backdrop-blur-[3px] bg-gradient-to-t from-green-800 via-green-900/60 to-transparent">
        <div className="container relative z-10 py-12 md:py-24">
          <div className='max-w-xl space-y-4 '>
            <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold drop-shadow'>How To Earn</h2>
            <p className="drop-shadow-sm">
              Step Turning Digital Land into Cashflow
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-4 mt-12">
            <CardItemValue
              icon="hugeicons:real-estate-02"
              step={1}
              title="Real Assets"
              text="Real Land [BOT operated]"
              bgColor="bg-[#1F2933]"
              textColor="text-[#1F2933]"
            />
            <CardItemValue
              icon="vaadin:chart-3d"
              step={2}
              title="Revenue"
              text="Revenue from operations"
              bgColor="bg-[#334155]"
              textColor="text-[#334155]"
            />
            <CardItemValue
              icon="lets-icons:map-fill"
              step={3}
              title="Zone Allocation"
              text="Revenue allocated by physical zone"
              bgColor="bg-[#475569]"
              textColor="text-[#475569]"
            />
            <CardItemValue
              icon="mdi:island"
              step={4}
              title="Digital Land"
              text="Mapped to Digital Land Parcels"
              bgColor="bg-[#64748B]"
              textColor="text-[#64748B]"
            />
            <CardItemValue
              icon="hugeicons:blockchain-07"
              step={5}
              title="Revenue Pool"
              text="Aggregated into DPU Revenue Pools"
              bgColor="bg-[#22C55E]"
              textColor="text-[#22C55E]"
            />
            <CardItemValue
              icon="solar:card-send-broken"
              step={6}
              title="Distribution"
              text="Cash distributions to investors"
              bgColor="bg-[#16A34A]"
              textColor="text-[#16A34A]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

type TCardItemValue = {
  step: number
  title: string
  text: string
  icon: string
  bgColor?: string
  textColor?: string
}

const CardItemValue = (props: TCardItemValue) => {
  return (
    <div className="relative flex flex-col justify-center items-center">
      <div className="absolute -top-5 left-0 right-0 flex items-center justify-center">
        <div className={cn(
          "h-10 w-10 text-2xl bg-white rounded-full font-bold flex items-center justify-center",
          props.textColor
        )}>
          {props.step}
        </div>
      </div>
      <div className={cn(
        "min-h-24 w-full pt-6 text-white rounded-t-3xl rounded-b-[120px]",
        props.bgColor
      )}>
        <div className="text-center font-semibold">{props.title}</div>
        <div className="flex items-center justify-center">
          <Icon className="text-3xl" name={props.icon} />
        </div>
      </div>
      <div className={cn(
        "h-6 md:h-8 w-2 -mt-1 mb-3 rounded-b-full",
        props.bgColor
      )}></div>
      <div className={cn(
        "text-sm min-h-16 flex items-center rounded-3xl text-white p-3 text-center",
        props.bgColor
      )}>
        {props.text}
      </div>
    </div>
  )
}

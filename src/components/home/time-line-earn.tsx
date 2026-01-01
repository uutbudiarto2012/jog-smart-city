import Image from "next/image";
import { Icon } from "../icon";
import { Timeline } from "../ui/timeline";

export function TimeLineEarn() {
  const data = [
    {
      title: "Real Assets",
      content: (
        <div className="space-y-4">
          <div className="aspect-[453/358] max-w-[200px] w-full relative rounded-2xl overflow-hidden">
            <Image className="w-full h-full object-contain" fill alt="earn1" src={'/img/earn-steps/1.png'} />
          </div>
          <div className="flex">
            <div className="w-8">
              <Icon className="text-2xl" name="hugeicons:real-estate-02" />
            </div>
            <div className="text-xl font-semibold flex-1">Real Land [BOT operated]</div>
          </div>
          <p>
            Physical assets are developed and operated under a Build-Operate-Transfer (BOT) model, ensuring professional management and long-term operational stability.
          </p>
        </div>
      ),
    },
    {
      title: "Revenue",
      content: (
        <div className="space-y-4">
          <div className="aspect-[453/358] max-w-[200px] w-full relative rounded-2xl overflow-hidden">
            <Image className="w-full h-full object-contain" fill alt="earn1" src={'/img/earn-steps/2.png'} />
          </div>
          <div className="flex">
            <div className="w-8">
              <Icon className="text-2xl" name="vaadin:chart-3d" />
            </div>
            <div className="text-xl font-semibold flex-1">Revenue Generated</div>
          </div>
          <p>
            Income is generated from real economic activities such as leasing, services, usage fees, and operational contracts.
          </p>
        </div>
      ),
    },
    {
      title: "Zone Allocation",
      content: (
        <div className="space-y-4">
          <div className="aspect-[453/358] max-w-[200px] w-full relative rounded-2xl overflow-hidden">
            <Image className="w-full h-full object-contain" fill alt="earn1" src={'/img/earn-steps/3.png'} />
          </div>
          <div className="flex">
            <div className="w-8">
              <Icon className="text-2xl" name="lets-icons:map-fill" />
            </div>
            <div className="text-xl font-semibold flex-1">Allocated by Economic Zone</div>
          </div>
          <p>
            All revenue is categorized and attributed to specific economic zones, each with distinct performance and risk characteristics.
          </p>
        </div>
      ),
    },
    {
      title: "Digital Land",
      content: (
        <div className="space-y-4">
          <div className="aspect-[453/358] max-w-[200px] w-full relative rounded-2xl overflow-hidden">
            <Image className="w-full h-full object-contain" fill alt="earn1" src={'/img/earn-steps/4.png'} />
          </div>
          <div className="flex">
            <div className="w-8">
              <Icon className="text-2xl" name="mdi:island" />
            </div>
            <div className="text-xl font-semibold flex-1">Mapped to Digital Land</div>
          </div>
          <p>
            Zone-based revenue is mapped to Digital Land parcels, creating on-chain representations of economic participation rather than land ownership.
          </p>
        </div>
      ),
    },
    {
      title: "Revenue Pool",
      content: (
        <div className="space-y-4">
          <div className="flex">
            <div className="w-8">
              <Icon className="text-2xl" name="hugeicons:blockchain-07" />
            </div>
            <div className="text-xl font-semibold flex-1">Revenue Pool (DPU)</div>
          </div>
          <div className="aspect-[453/358] max-w-[200px] w-full relative rounded-2xl overflow-hidden">
            <Image className="w-full h-full object-contain" fill alt="earn1" src={'/img/earn-steps/5.png'} />
          </div>
          <p>
            A predefined portion of zone revenue is aggregated into a distribution pool and calculated proportionally for eligible Digital Land holders.
          </p>
        </div>
      ),
    },
    {
      title: "Distribution",
      content: (
        <div className="space-y-4">
          <div className="flex">
            <div className="w-8">
              <Icon className="text-2xl" name="solar:card-send-broken" />
            </div>
            <div className="text-xl font-semibold flex-1">Distributed to Investors</div>
          </div>
          <div className="aspect-[453/358] max-w-[200px] w-full relative rounded-2xl overflow-hidden">
            <Image className="w-full h-full object-contain" fill alt="earn1" src={'/img/earn-steps/6.png'} />
          </div>
          <p>
            Cash distributions are made to investors based on their Digital Land holdings and the performance of the underlying economic zone.
          </p>
        </div>
      ),
    },
  ]
  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
}

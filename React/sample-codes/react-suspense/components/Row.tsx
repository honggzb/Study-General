import Image from 'next/image'
import getData from '@/lib/get-data'
import ErrorRow from './ErrorRow';
import { ArrowDown, ArrowUp } from 'lucide-react';
import glucose from "@/public/glucose.svg";
import heart from "@/public/heart.svg";
import phone from "@/public/phone.svg";
import pulse from "@/public/pulse.svg";
import shoe from "@/public/shoe.svg";
import timer from "@/public/timer.svg";

const icons: any = {
  glucose,
  heart,
  phone,
  pulse,
  shoe,
  timer,
};

const Row = async({route}: { route: string}) => {
  const data = await getData(route);
  if(!data) return <ErrorRow />;
  return (
    <div className="flex justify-between p-2.5 bg-white rounded-[26px] shadow border border-black border-opacity-10 items-center w-full">
      <div className="flex items-center">
        <div className="w-20 h-20 mr-5">
          <div className="image w-20 h-20 bg-blue-600 rounded-[22px] flex justify-center items-center">
            <Image alt="icon" src={icons[data.icon]} />
          </div>
        </div>
        <div className="w-34">
          <div className="label text-neutral-400 font-normal text-xl">
            {data.label}
          </div>
          <div className="value text-black font-medium leading-7 text-2xl">
            {data.value}
          </div>
        </div>
      </div>
      <div className="variance flex mr-2 w-14">
        <div className="w-6 h-6 mt-1">
          {data.varianceDirection === "up" ? (<ArrowUp />) : (<ArrowDown />)}
        </div>
        <div className="text-blue-600 text-[23px] font-normal">
          {data.variance}
        </div>
      </div>
    </div>
  )
}

export default Row
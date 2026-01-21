import { Menu, Siren } from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";
import RowCallback from "@/components/RowCallback";
import Row from "@/components/Row";

export default async function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="app w-[390px] h-[844px] bg-gray-200 flex-col justify-center items-center inline-flex rounded-3xl shadow border-4 border-white border-opacity-100">
        <div className="self-stretch grow shrink basis-0 p-5 flex-col justify-start items-start gap-2.5 inline-flex">
          <div className="self-stretch justify-between items-center inline-flex mb-1">
            <div className="justify-start items-center gap-2 flex">
              <div className="status w-5 h-5 bg-blue-600 rounded-full border-4 border-white " />
              <div className="text-black text-[25px] font-medium">
                My health metrics
              </div>
            </div>
            <Menu className="w-6 h-6 text-black" />
          </div>
          <Suspense fallback={<RowCallback />}>
            <Row route={"heart-rate"} />
          </Suspense>
          <Suspense fallback={<RowCallback />}>
            <Row route={"calories"} />
          </Suspense>
          <Suspense fallback={<RowCallback />}>
            <Row route={"steps"} />
          </Suspense>
          <Suspense fallback={<RowCallback />}>
            <Row route={"sleep"} />
          </Suspense>
          <Suspense fallback={<RowCallback />}>
            <Row route={"screen-time"} />
          </Suspense>
          <Suspense fallback={<RowCallback />}>
            <Row route={"glucose-level"} />
          </Suspense>
          <div className="brand self-stretch py-3 justify-center items-start gap-2 inline-flex mt-1">
            <Siren />
          </div>
        </div>
      </div>
    </main>
  );
}

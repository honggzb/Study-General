
/**
 * https://www.youtube.com/watch?v=CHGHuF24Cjw
 *
 */

import Parallax from "@/components/Parallax";

export default function Home() {
  return (
    <>
      <section className="h-screen flex items-center justify-center bg-gray-900">
        <div> </div>
      </section>
      <Parallax type={" "} />
      <section className="h-screen flex items-center justify-center bg-gray-900">
        <div> </div>
      </section>
      <section className="h-screen flex items-center justify-center bg-gray-900">
        <div> </div>
      </section>
      <Parallax type={"services"} />
      <section className="h-screen flex items-center justify-center bg-gray-900">
        <div> </div>
      </section>
    </>
  );
}

import MultiLayerParallax from '@/components/MultiLayerParallax';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ["latin"]});

export default function Home() {
  return (
    <main className={inter.className}>
      <MultiLayerParallax />
      <div className="w-full bg-[#06141D] flex flex-col items-center justify-center mx-auto p-60 text-2xl">
        <p> Officia sint reprehenderit irure est ea duis nisi dolor tempor reprehenderit nisi ea laboris Lorem. Ipsum et fugiat irure sint quis consequat tempor labore amet id deserunt ipsum esse. Sunt incididunt labore velit cillum anim ullamco duis adipisicing proident proident ullamco adipisicing. Incididunt voluptate officia amet aliqua labore eu consectetur id sit. Velit labore proident reprehenderit et dolore proident.</p>
        <p>Anim officia ea est nostrud voluptate ut magna qui. Amet consequat consequat Lorem exercitation enim adipisicing sint cupidatat fugiat quis tempor nisi magna Lorem. Elit reprehenderit culpa non sint laboris labore eiusmod aute aliquip in pariatur. Irure dolor eu commodo et aliqua adipisicing sint exercitation. Ullamco pariatur fugiat cupidatat sint cupidatat magna labore fugiat.
        Aliquip magna consequat veniam veniam ad nulla ullamco voluptate ex anim. Ut nulla aliquip adipisicing irure cupidatat aliqua fugiat. Nulla aute nisi laboris eu adipisicing ut ut cupidatat. Labore esse enim aliqua nisi. Culpa labore nostrud sint ullamco.</p>
        <p> Fugiat qui quis consectetur incididunt magna. Cillum do est reprehenderit pariatur irure. Ex tempor consequat cillum do excepteur culpa. Labore fugiat consectetur mollit laborum exercitation nisi aliquip commodo ullamco laborum adipisicing esse. Nulla culpa pariatur sit non.</p>
        <p> Officia sint reprehenderit irure est ea duis nisi dolor tempor reprehenderit nisi ea laboris Lorem. Ipsum et fugiat irure sint quis consequat tempor labore amet id deserunt ipsum esse. Sunt incididunt labore velit cillum anim ullamco duis adipisicing proident proident ullamco adipisicing. Incididunt voluptate officia amet aliqua labore eu consectetur id sit. Velit labore proident reprehenderit et dolore proident.</p>
        <p>Anim officia ea est nostrud voluptate ut magna qui. Amet consequat consequat Lorem exercitation enim adipisicing sint cupidatat fugiat quis tempor nisi magna Lorem. Elit reprehenderit culpa non sint laboris labore eiusmod aute aliquip in pariatur. Irure dolor eu commodo et aliqua adipisicing sint exercitation. Ullamco pariatur fugiat cupidatat sint cupidatat magna labore fugiat.
        Aliquip magna consequat veniam veniam ad nulla ullamco voluptate ex anim. Ut nulla aliquip adipisicing irure cupidatat aliqua fugiat. Nulla aute nisi laboris eu adipisicing ut ut cupidatat. Labore esse enim aliqua nisi. Culpa labore nostrud sint ullamco.</p>
        <p> Fugiat qui quis consectetur incididunt magna. Cillum do est reprehenderit pariatur irure. Ex tempor consequat cillum do excepteur culpa. Labore fugiat consectetur mollit laborum exercitation nisi aliquip commodo ullamco laborum adipisicing esse. Nulla culpa pariatur sit non.</p>
      </div>
    </main>
  );
}

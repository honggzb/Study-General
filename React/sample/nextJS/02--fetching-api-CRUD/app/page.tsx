import ListBox from "@/components/list-box";
import ListShow from "@/components/list-show";

export default function Home() {
  return (
    <main className="flex flex-col w-8/12 justify-between mx-auto">
      <ListBox />
      <ListShow />
    </main>
  );
}

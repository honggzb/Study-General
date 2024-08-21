import ListBox from "@/components/list-box";
import ListShow from "@/components/list-show";

export default function Home() {
  return (
    <main className="flex flex-col w-8/12 mx-auto justify-between p-10">
      <ListBox />
      <ListShow />
    </main>
  );
}

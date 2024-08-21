import AddTalent from "@/components/add-talent";
import ShowTalent from "@/components/show-talent";
import { prisma } from "@/utils/prisma";

export default async function Home() {
  const talentsData = await prisma.talent.findMany();
  console.log("talents", talentsData);
  return (
    <main className="flex flex-col w-8/12 mx-auto justify-between p-10">
      <h1 className="text-6xl font-bold text-center">💼Talenti</h1>
      <p className="text-center">Save money, hire best talents</p>
      <AddTalent />
      { talentsData.length > 0 && talentsData.map((talent) => (
        <div key={talent.id}>
          <ShowTalent talentData={talent} />
        </div>
      ))}
    </main>
  );
}

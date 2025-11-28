import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <h1 className="text-6xl">Welcome to product project</h1>
      <Link href={"/products"} className="text-2xl underline mt-4">
        Explore Products
      </Link>
    </main>
  );
}

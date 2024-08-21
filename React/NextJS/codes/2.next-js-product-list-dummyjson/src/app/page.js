'use client'
import { RouteKind } from "next/dist/server/future/route-kind";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  console.log(router)
  const handleNavigation = () => {
    router.push('/posts/3')
  }
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h2 className="text-6xl">Welcome to Product Project</h2>
      <Link href={"/products"} className="text-2xl underline mt-4">Explore our Product</Link>
    </main>
  );
}

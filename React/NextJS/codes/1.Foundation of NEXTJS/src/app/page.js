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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Home Page
      <Link href={"/profile"}>Link to Profile</Link>
      <Link href={"/profile/setting"}>Link to Profile setting</Link>
      <Link href={"/posts/3"}>Link to post 3</Link>
      <button onClick={handleNavigation}>Go to Post using useRouter hook</button>
    </main>
  );
}

import { Space_Grotesk } from "next/font/google";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { auth, signIn, signOut } from "@/auth";
import { Button } from "@/components/ui/Button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const space = Space_Grotesk({ subsets: ["latin"] });

const Navbar = async () => {
  const session = await auth();
  //console.log('session', session);
  return (
    <div className='flex w-full items-center justify-between'>
      <div className='flex items-center gap-2'>
        <Image src="/logo.svg" width="60" height="60" alt="logo" />
        <h1 className={cn`${space.className} text-3xl`}>Posty</h1>
      </div>
      <div className="flex gap-4">
      {session?.user && (
          <Avatar>
            <AvatarImage src={session?.user?.image || ""} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        )}
        {session?.user ? (
          <form action={async () => {
              "use server"
              await signOut()
            }}>
          <Button variant="destructive">Sign out</Button>
        </form>
        ) : (
          <form action={async () => {
              "use server"
              await signIn("github")
            }}>
          <Button>Sign in</Button>
        </form>
        )}
      </div>
    </div>
  )
}

export default Navbar
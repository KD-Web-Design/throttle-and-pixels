import { auth } from "@/db/firebaseConfig";
import { signOut } from "firebase/auth";
import { LogOut, PlusCircleIcon, Settings } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function DashboardNav() {
  const router = useRouter();
  const handleSignOut = () => {
    signOut(auth);
    router.push("/");
  };
  return (
    <nav className="flex items-center justify-between mt-10 mb-4">
      <Link href="/dashboard">
        <Button>
          <Settings />
        </Button>
      </Link>
      <Link href="/dashboard/createArticle">
        <Button>
          <PlusCircleIcon />
        </Button>
      </Link>
      <Button onClick={handleSignOut}>
        <LogOut />
      </Button>
    </nav>
  );
}

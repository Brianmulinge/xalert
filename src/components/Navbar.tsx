import Link from "next/link";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, signOut } = useAuth();
  // Within Navbar
  console.log("Is Authenticated:", isAuthenticated);
  isAuthenticated ? console.log("logged in") : console.log("logged out");
  return (
    <header className="text-center items-center w-full flex p-2 justify-between border-b-2">
      {isAuthenticated ? (
        <Link href="/dashboard">
          <h1 className="font-bold text-2xl">Xalert</h1>
        </Link>
      ) : (
        <Link href="/">
          <h1 className="font-bold text-2xl">Xalert</h1>
        </Link>
      )}
      {isAuthenticated ? (
        <Button onClick={signOut}>Sign Out</Button>
      ) : (
        <Link href="/signin">
          <Button>Sign In</Button>
        </Link>
      )}
    </header>
  );
}

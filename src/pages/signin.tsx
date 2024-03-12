// pages/signin.js
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const response = await fetch("/api/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      // Redirect to the dashboard or some other page on successful sign in
      router.push("/dashboard");
    } else {
      const result = await response.json();
      setError(result.error || "An error occurred, please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen min-w-screen p-4">
      <form
        className="flex flex-col items-center p-4 space-y-4 border rounded-lg"
        onSubmit={handleSubmit}
      >
        <h1 className="text-xl font-semibold text-center">Sign In</h1>
        <Input
          className="w-full h-full p-4"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          required
        />
        <Input
          className="p-4"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <Button type="submit">Sign In</Button>
        <Link href="/signup">
          <h1>Don&apos;t have an account</h1>
        </Link>

        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Signin;

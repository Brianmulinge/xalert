// pages/signup.js
import { FormEvent, useState } from "react";
import Router from "next/router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Username, setUsername] = useState<string>("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const response = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      // Redirect to the dashboard or home page on successful signup
      Router.push("/dashboard");
    } else {
      const result = await response.json();
      setError(result.error || "An error occurred, please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen min-w-screen">
      <form className="flex flex-col space-y-2 p-4" onSubmit={handleSubmit}>
        <h1 className="text-center text-2xl font-semibold">Sign Up</h1>
        <Input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          required
        />
        <Input
          type="text"
          value={Username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <Input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <Button type="submit">Sign Up</Button>
        <Link href="/signin">
          <h1>Already have an account</h1>
        </Link>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Signup;

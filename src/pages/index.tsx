import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={` ${inter.className}`}>
      <div className="flex flex-col min-h-screen">
        <div className="text-center flex flex-col justify-center pt-40 px-2 h-full w-full">
          <h1 className="font-semibold lg:font-bold text-xl md:3xl lg:text-4xl">
            Get alerts from your loved ones at any time
          </h1>
        </div>
      </div>
    </main>
  );
}

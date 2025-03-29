import { ModeToggle } from "@/components/written/modetoggle";
import Slot from "@/components/written/slot";

export default function Home() {
  return (
    <main className="w-full h-fit p-10">

      <header className="w-full h-fit flex justify-between items-center">
        <div className="w-fit h-fit">
          <h1 className="text-4xl font-bold">React slot</h1>
          <p>A simple slot machines built with react 19 and simple math algorithm</p>
          <p>Made with ❤️ by Arco for fun and educational purpose lol</p>
        </div>
        <ModeToggle />
      </header>

      <div className="w-fit h-fit mx-auto mt-10">
        <Slot />
      </div>

    </main>
  );
}

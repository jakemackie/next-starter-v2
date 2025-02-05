import { Play } from 'lucide-react';

export default async function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-5xl lg:text-7xl font-bold lg:leading-20 tracking-tight">
        Thousands of designs that are proven to convert.
      </h1>
      <p className="text-xl lg:text-2xl font-medium tracking-tight">
        AI can do that for you, for free.
      </p>
      <div className="relative w-full flex items-center justify-center max-w-2xl lg:max-w-none lg:max-h-[30rem] aspect-video bg-gray-200 border-4 border-gray-300 rounded-3xl">
        {/* <video src="/videos/demo.mp4" autoPlay loop muted playsInline /> */}
        <button className="
          p-4 flex items-center justify-center bg-gray-100 border 
          rounded-full shadow-sm hover:shadow-lg active:shadow-none 
          transition-all hover:scale-105 active:scale-90 duration-300 
          ease-in-out group
        ">
          <Play className="size-8 fill-gray-400 stroke-gray-400 group-hover:fill-gray-500 group-hover:stroke-gray-500 transition-all duration-300 ease-in-out" />
        </button>
      </div>
    </div>
  );
}

export default async function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-5xl lg:text-7xl font-bold lg:leading-20 tracking-tight">
        Don&apos;t waste time finding that email.
      </h1>
      <p className="text-xl lg:text-2xl font-medium tracking-tight">
        AI can do that for you, for free.
      </p>
      <div className="w-full max-w-2xl lg:max-w-none lg:max-h-[30rem] aspect-video bg-gray-200 border-4 border-gray-300 rounded-3xl">
        {/* <video src="/videos/demo.mp4" autoPlay loop muted playsInline /> */}
      </div>
    </div>
  );
}

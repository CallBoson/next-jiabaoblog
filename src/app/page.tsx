import Terminal from "../components/terminal";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm flex">
        <p className="border-gray-300 bg-zinc-200 rounded px-4 py-2 backdrop-blur-2xl flex">
          Please contact following Wechat if you have any problems:&nbsp;
          <code className="font-mono font-bold">cbdljb</code>
        </p>
        <div className="text-white">
          <a
            className="pointer"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            By Jiabao
          </a>
        </div>
      </div>

      <Terminal />

      <div className="text-center leading-[16px] text-white">
        <p>© Jiabao 2023</p>
        <p>Special One</p>
        <p>
          Site code cannot be found{" "}
          <a className="text-sky-300 font-bold" target="_blank" href="#">
            here
          </a>
        </p>
      </div>
    </main>
  );
}

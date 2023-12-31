"use client";
import { useLayoutEffect, useState } from "react";
import Terminal from "../components/terminal";

export default function Home() {
  const [height, setHeight] = useState("100vh");

  useLayoutEffect(() => {
    setHeight(`${document.documentElement.clientHeight}px`);
  }, []);

  return (
    <main
      className="flex w-[90%] md:w-[600px] mx-auto flex-col items-center justify-between"
      style={{ height }}
    >
      <div className="text-transparent">by Jiabao</div>
      <Terminal />

      <div className="md:mt-0 mt-28 mb-8 text-center leading-[16px] text-white">
        <p>© Jiabao 2023</p>
        <p>Special One ❤️</p>
        <p>
          Site code can be found{" "}
          <a
            className="text-sky-300 font-bold"
            target="_blank"
            href="https://github.com/CallBoson/next-jiabaoblog"
          >
            here
          </a>
        </p>
      </div>
    </main>
  );
}

"use client";
import CLI from "@/cli";
import { useState } from "react";
import type { History } from "../../types/cli";

const HistoryItem = ({ item }: { item: History }) => (
  <>
    <p className="flex my-2">
      <span className="">
        <span className="text-green-300">{item.path}</span>
        <span className="mx-[10px] text-red-400">❯</span>
      </span>
      <span className="">{item.command}</span>
    </p>
    <p
      className="ml-[20px]"
      dangerouslySetInnerHTML={{ __html: item.output }}
    ></p>
  </>
);

export default function Terminal() {
  const [history, setHistory] = useState<History[]>([]);
  const [path, setPath] = useState<string>("root");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const command = e.currentTarget.value;
      setHistory([...CLI.runCommand(command)]);
      setPath(CLI.currentPath);
      e.currentTarget.value = "";
    }
  };

  return (
    <div className="w-[600px] h-[360px] rounded-[10px]">
      <header className="bg-[#e0e8f0] h-[30px] rounded-t-[8px] pl-[10px]">
        <div className="w-[12px] h-[12px] inline-block rounded-[8px] mt-[10px] mr-[10px] bg-[#e75448]"></div>
        <div className="w-[12px] h-[12px] inline-block rounded-[8px] mt-[10px] mr-[10px] bg-[#e5c30f]"></div>
        <div className="w-[12px] h-[12px] inline-block rounded-[8px] mt-[10px] mr-[10px] bg-[#3bb662] cursor-pointer"></div>
      </header>
      <div className="bg-[#30353a] h-full p-[10px] box-border text-white overflow-auto">
        <p>
          <span className="text-green-600">\[._.]/</span> - you're in Jiabao's
          cli! type `help` to get started.
        </p>
        {history.map((item, index) => (
          <HistoryItem key={item.id} item={item} />
        ))}
        <p className="flex mt-2">
          <span className="">
            <span className="text-green-300">{path}</span>
            <span className="mx-[10px] text-red-400">❯</span>
          </span>
          <input
            type="text"
            className="outline-none bg-transparent flex-grow"
            onKeyDown={handleKeyDown}
          />
        </p>
      </div>
    </div>
  );
}

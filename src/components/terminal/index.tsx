"use client";

declare global {
  interface Document {
    startViewTransition?: (callback: () => void) => void;
  }
}

import CLI from "@/cli";
import { useEffect, useRef, useState } from "react";
import type { History } from "../../types/cli";

const HistoryItem = ({ item }: { item: History }) => (
  <>
    <p
      className="flex my-2"
      style={{ viewTransitionName: "var(--i)" }}
      ref={(ref) =>
        ref?.style.setProperty("--i", String(Math.floor(Math.random() * 100)))
      }
    >
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
  const inputRef = useRef<HTMLInputElement>(null);

  const [history, setHistory] = useState<History[]>([]);
  const [path, setPath] = useState<string>("root");
  let commandHistoryIndex = -1;

  useEffect(() => {
    // 当历史记录更新时，滚动到底部
    const terminal = document.querySelector("#terminal");
    terminal?.scrollTo(0, terminal.scrollHeight);
  }, [history]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const command = e.currentTarget.value;
      if (document.startViewTransition) {
        document.startViewTransition(() => {
          setHistory([...CLI.runCommand(command)]);
          setPath(CLI.getShortPath());
        });
      } else {
        setHistory([...CLI.runCommand(command)]);
        setPath(CLI.getShortPath());
      }
      e.currentTarget.value = "";
      return;
    }

    if (e.key === "ArrowUp") {
      if (CLI.commandHistory.length === 0) return;
      if (commandHistoryIndex === -1) {
        commandHistoryIndex = CLI.commandHistory.length - 1;
      } else if (commandHistoryIndex > 0) {
        commandHistoryIndex--;
      }
      e.currentTarget.value = CLI.commandHistory[commandHistoryIndex];
      return;
    }

    if (e.key === "ArrowDown") {
      if (CLI.commandHistory.length === 0) return;
      if (commandHistoryIndex < CLI.commandHistory.length - 1) {
        commandHistoryIndex++;
      } else {
        e.currentTarget.value = "";
        return;
      }
      e.currentTarget.value = CLI.commandHistory[commandHistoryIndex];
    }
  };

  return (
    <div className="w-[600px] h-[360px] rounded-[10px]">
      <header className="bg-[#e0e8f0] h-[30px] rounded-t-[8px] pl-[10px]">
        <div className="w-[12px] h-[12px] inline-block rounded-[8px] mt-[10px] mr-[10px] bg-[#e75448]"></div>
        <div className="w-[12px] h-[12px] inline-block rounded-[8px] mt-[10px] mr-[10px] bg-[#e5c30f]"></div>
        <div className="w-[12px] h-[12px] inline-block rounded-[8px] mt-[10px] mr-[10px] bg-[#3bb662] cursor-pointer"></div>
      </header>
      <div
        id="terminal"
        className="bg-[#30353a] h-full p-[10px] box-border text-white overflow-auto cursor-default"
        onClick={() => inputRef.current?.focus()}
      >
        <p>
          <span className="text-green-600">\[._.]/</span> - you're in Jiabao's
          cli! type `help` to get started.
        </p>
        {history.map((item, index) => (
          <HistoryItem key={item.id} item={item} />
        ))}
        <p className="flex mt-2" style={{ viewTransitionName: "input" }}>
          <span className="">
            <span className="text-green-300">{path}</span>
            <span className="mx-[10px] text-red-400">❯</span>
          </span>
          <input
            ref={inputRef}
            type="text"
            className="outline-none bg-transparent flex-grow cursor-default"
            onKeyDown={handleKeyDown}
          />
        </p>
      </div>
    </div>
  );
}

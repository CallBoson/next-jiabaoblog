import * as pathJs from "path";
import type { History } from "./types/cli.d.ts";
import { wrapWithLiTag, wrapWithTagForDirectory } from "./text-to-html";

const rootPath = "root";

const noWriteAccess: Error = new Error(
  "Error: you do not have write access to this directory"
);

class CLI {
  currentPath: string;
  history: History[];
  commands: Record<string, Function>;
  struct: Record<string, any>;
  commandHistory: string[];

  constructor() {
    this.currentPath = rootPath;
    this.history = [];
    this.commands = {};
    this.struct = {
      root: {
        "about.txt": "前端程序员，uping，该项目基于Next.js",
        "contact.txt": "微❤️: cbdljb",
        skills: {
          frontend: {
            "react.txt": "你也会react吗？我们可以一起交流",
            "vue.txt": "你是尤雨溪门徒？",
          },
          "programming.txt": "fuck offffffffff",
          "design.txt": "其实我并不会design",
        },
      },
    };
    this.commandHistory = [];
    this.registerCommands();
  }

  registerCommands() {
    this.registerCommand("help", this.help.bind(this));
    this.registerCommand("path", this.path.bind(this));
    this.registerCommand("ls", this.ls.bind(this));
    this.registerCommand("cd", this.cd.bind(this));
    this.registerCommand("cat", this.cat.bind(this));
    this.registerCommand("clear", this.clear.bind(this));
    this.registerCommand("mkdir", this.mkdir.bind(this));
    this.registerCommand("touch", this.touch.bind(this));
    this.registerCommand("rm", this.rm.bind(this));
  }

  mkdir() {
    throw noWriteAccess;
  }

  touch() {
    throw noWriteAccess;
  }

  rm() {
    throw noWriteAccess;
  }

  help() {
    // Implement the help command
    const helpText = `
        ls: list all files
        cd: change directory
        cat: show file content
        clear: clear screen
        path: show current path
    `;
    return wrapWithLiTag(helpText);
  }

  path() {
    // Implement the path command
    return this.currentPath;
  }

  ls(directory: string[]) {
    const absPath = this.getAbsPath(directory[0] || ".");
    const currentStruct = this.navigatePath(absPath);

    return wrapWithTagForDirectory(
      Object.keys(currentStruct).map((key) => {
        return {
          name: key,
          isDirectory: typeof currentStruct[key] === "object",
        };
      })
    );
  }

  cd(directory: string[]) {
    // 实现 cd 命令
    const absPath = this.getAbsPath(directory[0] || ".");

    this.navigatePath(absPath);

    this.currentPath = absPath;
  }

  cat(directory: string[]) {
    // 实现 cat 命令
    const absPath = this.getAbsPath(directory[0] || ".");
    const currentStruct = this.navigatePath(pathJs.dirname(absPath));
    const fileName = pathJs.basename(absPath);

    if (typeof currentStruct[fileName] === "string") {
      return currentStruct[fileName];
    } else {
      throw new Error(`Cannot cat a directory: ${absPath}`);
    }
  }

  clear() {
    // Implement the clear command
    this.history = [];
  }

  addHistory(path: string, command: string, output: string) {
    const id = Date.now().toString();
    this.history.push({ id, path, command, output });
    return id;
  }

  setHistoryOutput(id: string, output: string) {
    const history = this.history.find((item) => item.id === id);
    if (history) {
      history.output = output;
    }
  }

  registerCommand(name: string, handler: Function) {
    this.commands[name] = handler;
  }

  runCommand(command: string) {
    const [cmd, ...args] = command.trim().split(" ");
    let output = "";
    const id = this.addHistory(this.getShortPath(), command, "");
    this.commandHistory.push(command);
    try {
      if (this.commands.hasOwnProperty(cmd)) {
        output = this.commands[cmd](args);
      } else {
        throw new Error(`Command not found: ${cmd}`);
      }
    } catch (error: any) {
      output = error.message;
    }

    this.setHistoryOutput(id, output);

    return this.history;
  }

  // 根据路径获取绝对路径
  getAbsPath(dir: string): string {
    let currentPath = this.currentPath;
    if (dir === "..") {
      const pathParts = currentPath.split("/");
      pathParts.pop();
      currentPath = pathParts.join("/");
    } else if (dir === "~") {
      currentPath = rootPath;
    } else if (dir !== ".") {
      currentPath = `${currentPath}/${dir}`;
    }
    return pathJs.normalize(currentPath);
  }

  // 根据绝对路径导航到指定目录
  navigatePath(directory: string) {
    let currentStruct = this.struct;
    const pathParts = directory.split(pathJs.sep);
    for (const part of pathParts) {
      if (part in currentStruct && typeof currentStruct[part] === "object") {
        currentStruct = currentStruct[part];
      } else {
        throw new Error(`Directory not found: ${directory}`);
      }
    }
    return currentStruct;
  }

  getShortPath() {
    const pathParts = this.currentPath.split("/");
    const lastPart = pathParts.pop();
    return lastPart || "";
  }
}

const cli = new CLI();

export default cli;

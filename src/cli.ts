import * as pathJs from "path";
import type { History } from "./types/cli.d.ts";
import { wrapWithLiTag, wrapWithTagForDirectory } from "./text-to-html";

const rootPath = "root";

class CLI {
  currentPath: string;
  history: History[];
  commands: Record<string, Function>;
  struct: Record<string, any>;

  constructor() {
    this.currentPath = rootPath;
    this.history = [];
    this.commands = {};
    this.struct = {
      root: {
        "about.txt": "This is about",
        "contact.txt": "This is contact",
        "resume.txt": "This is resume",
        skills: {
          frontend: {
            "react.txt": "This is react",
            "vue.txt": "This is vue",
          },
          "programming.txt": "This is programming",
          "design.txt": "This is design",
        },
      },
    };
    this.registerCommands();
  }

  registerCommands() {
    this.registerCommand("help", this.help.bind(this));
    this.registerCommand("path", this.path.bind(this));
    this.registerCommand("ls", this.ls.bind(this));
    this.registerCommand("cd", this.cd.bind(this));
    this.registerCommand("cat", this.cat.bind(this));
    this.registerCommand("clear", this.clear.bind(this));
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

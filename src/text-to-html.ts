/**
 * 文本转换为 li 标签
 * e.g
 * const helpText = `
        ls: list all files
        cd: change directory
        cat: show file content
        clear: clear screen
        path: show current path
    `;
 */
export function wrapWithLiTag(text: string) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => `<li>${line}</li>`)
    .join("\n");
}

// 格式化ls命令输出
export function wrapWithTagForDirectory(
  arr: { name: string; isDirectory: boolean }[]
) {
  return `<div style="display: flex; flex-wrap: wrap;">${arr
    .map((item) => {
      if (item.isDirectory) {
        return `<span style="color:#88def2;margin-right: 30px;">${item.name}</span>`;
      }
      return `<span style="margin-right: 30px;">${item.name}</span>`;
    })
    .join("")}</div>`;
}

# Next-JiabaoBlog

Next-JiabaoBlog 是一个使用 Next.js 和 TypeScript 构建的个人博客项目。它包含一个模拟的命令行界面，用户可以通过输入命令来浏览博客内容。

## 主要功能

- `ls`: 列出当前目录下的所有文件和目录
- `cd`: 切换目录
- `cat`: 显示文件内容
- `clear`: 清屏
- `path`: 显示当前路径

## 安装

首先，你需要安装 Node.js 和 npm。然后，你可以通过以下命令来安装项目的依赖：

```
npm install
```

## 运行

你可以通过以下命令来启动开发服务器：

```
npm run dev
```

然后，你可以在浏览器中打开 [http://localhost:3000](http://localhost:3000) 来查看项目。

## 构建

你可以通过以下命令来构建项目：

```
npm run build
```

构建完成后，你可以通过以下命令来启动生产服务器：

```
npm run start
```

## Docker 部署

在项目的根目录下运行以下命令来构建 Docker 镜像：

    ```
    docker build -t next-jiabaoblog .
    ```

然后，你可以通过以下命令来启动 Docker 容器：

    ```
    docker run -d -p 3000:3000 next-jiabaoblog
    ```

## 代码检查

你可以通过以下命令来检查代码的质量：

```
npm run lint
```

## 技术栈

- Next.js
- TypeScript
- Tailwind CSS
- PostCSS
- ESLint

## 项目结构

- `src/cli.ts`: 实现了命令行的主要功能
- `src/components/terminal/index.tsx`: 实现了命令行的界面
- `src/app/page.tsx`: 实现了主页的布局
- `src/text-to-html.ts`: 提供了一些用于将文本转换为 HTML 的函数
- `src/types/cli.d.ts`: 定义了一些 TypeScript 类型
- `src/app/globals.css`: 定义了全局的 CSS 样式
- `src/app/layout.tsx`: 定义了全局的布局
- `package.json`: 定义了项目的依赖和脚本
- `tsconfig.json`: 定义了 TypeScript 的配置
- `postcss.config.js`: 定义了 PostCSS 的配置
- `tailwind.config.ts`: 定义了 Tailwind CSS 的配置
- `next.config.js`: 定义了 Next.js 的配置

# 使用官方的 Node.js 16 镜像作为基础镜像
FROM node:16

# 设置工作目录
WORKDIR /usr/src/app

# 将 package.json 和 package-lock.json 复制到工作目录
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 将项目代码复制到工作目录
COPY . .

# 构建项目
RUN npm run build

# 暴露 3000 端口
EXPOSE 3000

# 运行项目
CMD [ "npm", "run", "start" ]
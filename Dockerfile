FROM node:lts-alpine

RUN npm install pnpm -g

WORKDIR /usr/src/app

COPY package*.json ./

RUN pnpm install --production && rm -rf /root/.npm /root/.pnpm-store /usr/local/share/.cache /tmp/*

COPY . .

RUN pnpm run build

# 暴露 3000 端口
EXPOSE 3000

# 运行项目
CMD [ "npm", "run", "start" ]
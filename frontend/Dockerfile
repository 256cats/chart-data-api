FROM node:20-bookworm-slim

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV} NODE_OPTIONS="--enable-source-maps"

ENV SRV_PORT=8000

USER 1000
RUN mkdir /home/node/app && chown node:node -R /home/node/app
WORKDIR /home/node/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node .prettierrc.cjs ./.prettierrc.cjs
COPY --chown=node:node tsconfig*.json ./
COPY --chown=node:node .eslintrc.cjs ./
COPY --chown=node:node vite.config.ts ./vite.config.ts
COPY --chown=node:node index.html ./index.html
COPY --chown=node:node codegen.ts ./codegen.ts

RUN npm ci --loglevel warn --build-from-source

COPY --chown=node:node . .

EXPOSE $SRV_PORT

CMD ["npm", "start"]

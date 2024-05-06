# Builder image
FROM docker.arvancloud.ir/node:20-alpine AS BUILDER
WORKDIR /app

COPY .yarn ./.yarn
COPY .yarnrc.yml package.json yarn.lock ./

RUN yarn workspaces focus

COPY . .

RUN yarn build

# Final image
FROM docker.arvancloud.ir/node:20-alpine AS FINAL

WORKDIR /app

ENV NODE_ENV production

COPY .yarn ./.yarn
COPY .yarnrc.yml package.json yarn.lock ./

RUN yarn workspaces focus --production

COPY --from=BUILDER /app/public ./public
COPY --from=BUILDER /app/.next ./.next

EXPOSE 3000

CMD ["yarn", "start"]

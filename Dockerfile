# Builder image
FROM docker.arvancloud.ir/node:20-alpine AS BUILDER

WORKDIR /app
ENV NODE_ENV production

COPY .yarn ./.yarn
COPY .yarnrc.yml package.json yarn.lock ./
RUN yarn workspaces focus

COPY . .

RUN yarn build

# Final image
FROM docker.arvancloud.ir/node:20-alpine AS FINAL

WORKDIR /app
ENV NODE_ENV production

RUN mkdir .next
# COPY --from=BUILDER /app/public ./public
COPY --from=BUILDER /app/.next/standalone ./
COPY --from=BUILDER /app/.next/static ./.next/static

EXPOSE 3000

CMD HOSTNAME="0.0.0.0" PORT=3000 node server.js

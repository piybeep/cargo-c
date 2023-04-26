FROM node:lts-alpine as dependencies
WORKDIR /web
COPY package.json yarn.lock ./
RUN yarn install -s

FROM node:lts-alpine as builder
WORKDIR /web
COPY . .
COPY --from=dependencies /web/node_modules ./node_modules
RUN yarn build

FROM node:lts-alpine as runner
WORKDIR /web
ENV NODE_ENV production
COPY --from=builder /web/.env ./
COPY --from=builder /web/public ./public
COPY --from=builder /web/.next ./.next
COPY --from=builder /web/node_modules ./node_modules
COPY --from=builder /web/package.json ./package.json

EXPOSE 3000
CMD ["yarn", "start"]

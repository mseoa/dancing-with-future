ARG IMAGE=node:18-alpine3.18

FROM ${IMAGE} AS installer

WORKDIR /app
RUN apk update
RUN apk add -qq --no-cache libc6-compat
RUN apk add -qq --no-cache git

COPY . .
RUN npm install
RUN npm run build

FROM ${IMAGE} AS production

WORKDIR /app
RUN apk update

COPY --from=installer /app .

EXPOSE 3000
CMD node dist/main

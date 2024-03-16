FROM node:20-slim AS base
RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile && \
      pnpm build:frontend && \
      pnpm build:backend

FROM node:20-alpine
# COPY --from=prod-deps /app/node_modules /app/node_modules
# COPY --from=build /app/dist /app/dist
# COPY --from=base /app/node_modules /app/node_modules
WORKDIR /app
COPY --from=build /app/dist/apps .
COPY --from=prod-deps /app/node_modules ./node_modules
CMD [ "node", "backend/main.js" ]
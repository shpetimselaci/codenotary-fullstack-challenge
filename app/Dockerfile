FROM arm64v8/node:22.3-slim as base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY ./ /home/app
WORKDIR /home/app

# install dependencies into temp directory
# this will cache them and speed up future builds
FROM base as install

RUN mkdir -p /temp/dev/

COPY package.json pnpm-lock.yaml /temp/dev/

RUN cd /temp/dev/ && pnpm install --frozen-lockfile

FROM install as run

RUN cd /home/app

COPY --from=install /temp/dev/package.json /temp/dev/pnpm-lock.yaml  ./
COPY --from=install /temp/dev/node_modules node_modules

ENTRYPOINT ["pnpm", "dev"]
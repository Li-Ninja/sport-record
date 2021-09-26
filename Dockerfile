#
# build stage
#

# 使用 Node 的版本
FROM node:14.15.5-alpine as build-stage

# make the 'app' folder the current working directory
WORKDIR /app
# install simple http server for serving static content
COPY package.json .
COPY yarn.lock .
RUN yarn install
# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .
RUN yarn build

#
# production stage
#

FROM node:14.15.5-alpine as production-stage 
WORKDIR /app
COPY --from=build-stage /app/dist/ssr .
RUN yarn install
CMD yarn start

# 使用 Node 的版本
FROM node:14.15.5

# 複製
COPY . /sport-record

# Node 在容器內的位置
WORKDIR /sport-record

# 安裝必要的套件
RUN yarn install

# 開放對外的 port
EXPOSE 8080

# 執行專案
CMD yarn dev
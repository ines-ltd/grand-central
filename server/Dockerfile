FROM node:18-alpine
WORKDIR /src
ENV PORT=5000

COPY . .

RUN npm i -g sqlite3

RUN npm ci

EXPOSE 5000

CMD npm run dev

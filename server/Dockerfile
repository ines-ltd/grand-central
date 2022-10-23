FROM node:18-alpine
WORKDIR /src
ENV PORT=5000

COPY . .

RUN npm i

EXPOSE 5000

CMD npm run dev

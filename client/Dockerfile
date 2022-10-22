FROM node:18-alpine

WORKDIR /src

ENV PORT=3000

COPY . .

RUN ["npm", "i"]

EXPOSE 3000

CMD npm run dev --host

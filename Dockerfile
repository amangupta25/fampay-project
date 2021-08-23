FROM node:12-alpine
MAINTAINER amangupta570@gmail.com

ENV BASE_DIR /usr/app

WORKDIR ${BASE_DIR}
COPY . ${BASE_DIR}

RUN mkdir -p ${BASE_DIR}


# Add wait-for-it
COPY wait-for-it.sh wait-for-it.sh
RUN chmod +x wait-for-it.sh

EXPOSE 7000
RUN npm install --silent
RUN npm run build
RUN apk update && apk add bash

CMD ["./wait-for-it.sh" , "postgres:5432" , "--strict" , "--timeout=300" , "--" , "npm","run","build:server"]


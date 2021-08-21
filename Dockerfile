FROM node:12-alpine
MAINTAINER amangupta570@gmail.com

ENV BASE_DIR /usr/app
ENV BIN_DIR ${BASE_DIR}/bin

WORKDIR ${BASE_DIR}
COPY . ${BASE_DIR}
COPY docker/bin ${BIN_DIR}

RUN mkdir -p ${BASE_DIR} ${BIN_DIR}

RUN chown -R nobody:nogroup ${BIN_DIR}
RUN chmod 755 ${BIN_DIR}/*

RUN echo ${BIN_DIR}

EXPOSE 7000
RUN npm install --silent
RUN npm run build

CMD ["npm","run","build:server"]



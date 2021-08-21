#!/bin/bash
set -ex
cd ${BASE_DIR}
echo ${BASE_DIR}
NODE_ENV="${RUN_ENVIRONMENT:-development}" #default value for node env is nonprod
PORT=7000
#npm run dev
npm run build
npm run build:server

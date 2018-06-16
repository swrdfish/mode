#!/bin/bash

#start nginx
service nginx start

# start api server
cd /mode/api && npm run start &
cd /mode/app && npm run start

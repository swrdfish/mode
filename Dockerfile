FROM ubuntu:16.04

# install nginx, curl
RUN apt-get update && apt-get install -y nginx curl build-essential

# add nodejs source
RUN cd ~ && curl -sL https://deb.nodesource.com/setup_8.x -o nodesource_setup.sh && bash nodesource_setup.sh && apt-get install -y nodejs

# copy nginx config
COPY nginx_conf/sites-available/default /etc/nginx/sites-available/default


WORKDIR /mode

ADD . /mode

# install dependencies
RUN cd app/ && npm install && npm run build
RUN cd api/ && npm install

# Start 
ENTRYPOINT ["./entry.sh"]


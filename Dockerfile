# pull official base image
FROM node:18

USER root

# set working directory
WORKDIR /app
RUN apt-get update && \
  apt-get install --no-install-recommends -y \
  libgtk2.0-0 \
  libgtk-3-0 \
  libnotify-dev \
  libgconf-2-4 \
  libgbm-dev \
  libnss3 \
  libxss1 \
  libasound2 \
  libxtst6 \
  xauth \
  xvfb \
  # install emoji font
  fonts-noto-color-emoji \
  # install Chinese fonts
  # this list was copied from https://github.com/jim3ma/docker-leanote
  fonts-arphic-bkai00mp \
  fonts-arphic-bsmi00lp \
  fonts-arphic-gbsn00lp \
  fonts-arphic-gkai00mp \
  fonts-arphic-ukai \
  fonts-arphic-uming \
  ttf-wqy-zenhei \
  ttf-wqy-microhei \
  xfonts-wqy \
  # clean up
  && rm -rf /var/lib/apt/lists/*
  
RUN npm install --save-dev cypress
# install app dependencies
COPY package.json ./
# COPY package-lock.json ./
RUN npm install -g npm@9.3.0
RUN npm install 
RUN npm install react-scripts@3.4.1 -g
RUN npm install react next react-router


# add `/frontend/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# add app
COPY . ./

EXPOSE 3000

# start app
CMD npm start --host 0.0.0.0 --port 3000 --disableHostCheck true
FROM docker.io/library/node:18.18.2 as build

WORKDIR /Users/kimsunjung/Desktop/dev/fastAPI
COPY ./ /webrtc

# CMD . ~/.nvm/nvm.sh

WORKDIR /webrtc
RUN npm install express
RUN npm init -y
RUN npm i express ejs
RUN npm install socket.io@^2.3.0
RUN npm i --save-dev nodemon
RUN npm i -g peer
RUN npm run devStart
RUN peerjs --port 3001


FROM node:4.1.1


RUN npm install -g forever
RUN npm install -g babel
RUN npm install -g gulp

# Provides cached layer for node_modules
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /data/app/public/dist && cp -a /tmp/node_modules /data/app/

# Define working directory
WORKDIR /data/app
ADD . /data/app

RUN gulp production

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
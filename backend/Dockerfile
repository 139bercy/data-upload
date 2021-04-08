# pull official base image
FROM node:14-alpine

# Create app directory
WORKDIR /src/app

EXPOSE 8080
CMD [ "node", "/src/app/server.js" ]

# Install app dependencies
COPY package.json /src/app
COPY package-lock.json /src/app

# RUN npm install
# If you are building your code for production
RUN npm ci --only=production

# Bundle app source
COPY . /src/app

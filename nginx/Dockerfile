# build environment
FROM node:13-alpine as build-frontend

# set working directory
WORKDIR /src/app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /src/app/node_modules/.bin:$PATH

# install app dependencies
COPY frontend/package.json /src/app
COPY frontend/package-lock.json /src/app
RUN npm ci --only=production --silent
RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY frontend/ /src/app

RUN npm run build

# Create the container from the alpine linux image
FROM nginx:1.19.6-alpine

RUN mkdir -p /var/www/html

COPY nginx/site.conf.template /etc/nginx/conf.d/default.conf.template
COPY nginx/nginx-headers.conf /etc/nginx/general-security-headers.conf
COPY nginx/command.sh /etc/nginx/command.sh

COPY --from=build-frontend /src/app/build/ /var/www/html

EXPOSE 80
EXPOSE 443
CMD ["sh", "/etc/nginx/command.sh"]

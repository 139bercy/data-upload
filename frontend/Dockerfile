# pull official base image
FROM node:14-alpine

# set working directory
WORKDIR /src/app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /src/app/node_modules/.bin:$PATH

#  Pas besoin de faire l'install car c'est pour du dev donc on va utiliser un volume
# # install app dependencies
# COPY package.json /src/app
# COPY package-lock.json /src/app
# RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# # add app
# COPY . /src/app

# start app
CMD ["npm", "start"]

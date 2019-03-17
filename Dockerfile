FROM node:10.13-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock ./

RUN apk add --no-cache curl

RUN curl --compressed -o- -L https://yarnpkg.com/install.sh | sh

RUN yarn

# Bundle app source
COPY . .

EXPOSE 80

CMD [ "yarn", "start" ]

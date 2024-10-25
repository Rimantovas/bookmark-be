FROM node:18-alpine

# Install yarn and other necessary build tools
RUN apk add --no-cache yarn python3 make g++

WORKDIR /usr/src/app

# Copy package.json and yarn.lock and .yarnrc.yml
COPY package.json ./
COPY yarn.lock ./
COPY .yarnrc.yml ./

RUN corepack enable && corepack prepare yarn@4.5.1 --activate

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn build

EXPOSE 3000

# Run migrations and start the application
CMD yarn migration:run && node dist/src/main.js

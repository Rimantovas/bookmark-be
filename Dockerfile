FROM node:18-alpine

# Install yarn and other necessary build tools
RUN apk add --no-cache yarn python3 make g++

WORKDIR /usr/src/app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Set Yarn version (optional, remove if not needed)
RUN yarn set version 3.6.4

# Install dependencies
RUN yarn install --frozen-lockfile || yarn install --no-lockfile

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn build

EXPOSE 3000

# Run migrations and start the application
CMD yarn migration:run && yarn start:prod

FROM node:18-alpine

# Install yarn and other necessary build tools
RUN apk add --no-cache yarn python3 make g++

WORKDIR /usr/src/app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Copy the rest of the application code
COPY . .

RUN corepack enable

RUN corepack prepare yarn@stable --activate

# Set Yarn version (optional, remove if not needed)
RUN yarn set version stable

# Install dependencies
RUN yarn install


# Build the application
RUN yarn build

EXPOSE 3000

# Run migrations and start the application
CMD yarn migration:run && yarn start:prod

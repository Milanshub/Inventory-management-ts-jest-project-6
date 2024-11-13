# Stage 1: Build the React application
FROM node:18 AS build

WORKDIR /app

# Set a longer network timeout for Yarn to avoid network-related errors
ENV YARN_NETWORK_TIMEOUT=600000

# Copy only the package.json and yarn.lock first to leverage Docker caching
COPY package.json yarn.lock ./
RUN yarn install --network-timeout $YARN_NETWORK_TIMEOUT --ignore-optional

# Copy the rest of the application files and build it
COPY . .
RUN yarn build

# Stage 2: Use Nginx to serve the built application
FROM nginx:alpine

# Copy the build output to Nginx's html directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to allow external access
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

# Use the official Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /Auth

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application
COPY . .


EXPOSE 5173

# Serve the application
CMD ["npm", "run", "dev"]

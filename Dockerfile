# Use the official Bun image as the base image
FROM oven/bun

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Check if bun.lockb exists and copy it if it does
COPY bun.lockb* ./

# Install dependencies using Bun
RUN bun install

# Copy all the source code, including the Prisma folder if it's outside the src directory
COPY . .

# Set the environment variable for Node environment
ENV NODE_ENV production

# Define the command to run the application
CMD ["bun", "./src/index.ts"]

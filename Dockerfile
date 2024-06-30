# Use the official Bun image as the base image
FROM oven/bun

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package files and lock file to the container
COPY package*.json bun.lockb ./
# Copy the rest of the application code to the container
COPY . .
# Install dependencies using Bun
RUN bun install

# # Generate the Prisma client
# RUN npx prisma generate

# Ensure the necessary environment variable is set
ENV NODE_ENV=production

# Expose the port your app runs on (replace 3000 with your port if different)
EXPOSE 3000

# Command to run the application
CMD ["bun", "start"]

# Dockerfile

FROM node:latest

WORKDIR /app

# Copy package.json dan install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy semua file
COPY . .

# Expose port
EXPOSE 3000

# Jalankan aplikasi
CMD ["npm", "run", "start"]

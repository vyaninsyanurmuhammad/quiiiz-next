# Dockerfile

FROM node:latest

WORKDIR /app

# Copy package.json dan install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy semua file
COPY . .

# Build aplikasi (sesuaikan perintah build ini dengan framework yang Anda gunakan, contoh untuk aplikasi berbasis Nest.js)
RUN npm run build

# Expose port
EXPOSE 3000

# Jalankan aplikasi
CMD ["npm", "run", "start"]

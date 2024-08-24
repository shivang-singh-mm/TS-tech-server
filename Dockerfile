FROM node:16-alpine
WORKDIR /app
COPY . .
RUN npm install
Expose 5000
CMD ["npm", "run", "dev"]
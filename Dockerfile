FROM node:17.2.0-alpine3.12

# Create app directory
WORKDIR /app



# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY ["package.json", "package-lock.json*", "./"]

# Install app dependencies
RUN npm install

COPY . .

# RUN npm i -g prisma@3.6.0

RUN cd src/prisma && npx prisma generate

CMD ["npm", "start"]

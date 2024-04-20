FROM node:21.7.3-alpine3.19 AS BUILDER

RUN apk add wget && \
    apk add --no-cache git

# Set the working directory in the container
WORKDIR /app

COPY package*.json ./

RUN git clone https://github.com/wppconnect-team/wppconnect.git /home/app 

# Copy the application files into the working directory
COPY . /home/app

# Install the application dependencies
RUN npm i --save @wppconnect-team/wppconnect

FROM node:21.7.3-alpine3.19
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
WORKDIR /app
RUN apk add chromium
COPY --from=BUILDER /app/ .

# Define the entry point for the container
CMD ["npm", "start"]

EXPOSE 3000

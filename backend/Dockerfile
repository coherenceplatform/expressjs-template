FROM node:14.19.3-buster

WORKDIR /app

ADD https://www.postgresql.org/media/keys/ACCC4CF8.asc ./
RUN apt-key add ACCC4CF8.asc

RUN echo "deb http://apt.postgresql.org/pub/repos/apt/ buster-pgdg main" > /etc/apt/sources.list.d/pgdg.list

RUN DEBIAN=noninteractive apt-get update && apt-get install -y postgresql-client-13 vim cmake

COPY package.json package.json 
COPY package-lock.json package-lock.json 

RUN npm install

COPY . .

RUN ln -sf /app/node_modules/db-migrate/bin/db-migrate /usr/bin/db-migrate
RUN ln -sf /app/migrate_db.sh /usr/bin/migrate_db.sh
#RUN npm run build

#RUN npm ci --production

CMD ["npm", "start"]

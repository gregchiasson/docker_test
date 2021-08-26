FROM node:14

# Create app directory
WORKDIR /usr/src/app

#RUN apt-get install -y wget ca-certificates
#RUN wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -
#RUN sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" >> /etc/apt/sources.list.d/pgdg.list'

RUN apt update && apt-get -y install postgresql
RUN mkdir /usr/src/data
RUN chown postgres /usr/src/data

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

RUN su -c '/usr/lib/postgresql/9.6/bin/pg_ctl init -D /usr/src/data/' postgres
RUN su -c ' /usr/lib/postgresql/9.6/bin/pg_ctl -D /usr/src/data -l /var/tmp/logfile start' postgres &&  su -c 'createdb greg' postgres && psql -U postgres greg < /usr/src/app/schema.sql

EXPOSE 3000
CMD [ "node", "app.js" ]

# Project Description
ITEMS are things you want to keep track of - a TODO list, or shopping list, anything a user might want to keep track of. These items can belong to CATEGORIES, which are just an associated name. 

# Ports 
To change the port, change the docker mapping, or pass it in to the node app as an argument, eg:

node app.js 1337

The default port is 3000

# Docker
There's a Dockerfile.

NOTE that for some reason postgres doesnt stay started all the time, when the container starts up, and I'm not familiar enough with it to determine why that is. Workaround:

docker exec -it 7c19e13180f4 /bin/bash

and then from inside the container:

su -c '/usr/lib/postgresql/9.6/bin/pg_ctl -D /usr/src/data -l /var/tmp/logfile start' postgres

The process for rebuilding the image and starting the container is:

docker build . -t greg/docker-test
docker run -d -p 1337:3000 greg/docker-test

# TODOs
- Add any kind of validation, and better error handling
- There's a bit of repeating code in the post/put methods that I'd rather abstract out, but adding new API classes is _pretty_ quick, all things considered.
- I should probably ON DELETE CASCADE the item_category stuff, instead of requiring extra calls to delete those first.
- Would be nice to do a deep fetch on items, to get their categories, if any.

# "tests"
These are extremely not great, but there's not a lot of tooling, since it's just cURL. Other than the IDs in a few cases, these should be able to be run in order on a fresh container or DB refresh, and not error out.

curl -X POST localhost:3000/api/items -d '[{"name":"foo"}, {"name":"bar"}, {"name":"baz"}]' -H 'Content-Type:application/json'

curl localhost:3000/api/items

curl localhost:3000/api/item/2

curl -X DELETE localhost:3000/api/items

curl -X POST localhost:3000/api/item -d '{"name":"foo"}' -H 'Content-Type:application/json'

curl -X POST localhost:3000/api/item -d '{"name":"bar"}' -H 'Content-Type:application/json'

curl localhost:3000/api/items

curl -X PUT localhost:3000/api/item/2 -d '{"name":"barf"}' -H 'Content-Type:application/json'

curl -X DELETE localhost:3000/api/item/2

curl localhost:3000/api/categories

curl -X POST localhost:3000/api/category -d '{"name":"stuff"}' -H 'Content-Type:application/json'

curl -X POST localhost:3000/api/category -d '{"name":"things"}' -H 'Content-Type:application/json'

curl localhost:3000/api/category/1 

curl -X DELETE localhost:3000/api/category/2 

curl localhost:3000/api/categories

curl localhost:3000/api/items_categories

curl -X POST localhost:3000/api/item_category -d '{"item_id": 3, "category_id": 1}' -H 'Content-Type:application/json'

curl -X DELETE localhost:3000/api/item_category/1 

curl localhost:3000/api/items_categories?item_id=3

curl localhost:3000/api/items_categories?category_id=1

curl 'localhost:3000/api/items_categories?category_id=1&item_id=3'

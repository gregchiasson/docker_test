# project description
ITEMS are things you want to keep track of - a TODO list, or shopping list, anything a user might want to keep track of. These items can belong to CATEGORIES, which are just an associated name.

# ports
to change the port, change the docker mapping, or pass it in to the node app as an argument, eg:

node app.js 1337

default port is 3000

# docker
there's a dockerfile.

TODO not sure about these steps but thats a later problem
docker build . -t greg/docker-test
docker run -p 6969:3000 greg/docker-test

TODO: add postgres to the dockerfile

# TODOs
- add any kind of validation or better error handling
- there's a lot of repeating code in the post/put methods that i'd rather abstract out
- should probably ON DELETE CASCADE the item_category stuff, instead of requiring extra calls to delete those first
- search item-categories by name, and do deep fetches to display them

# "tests"
note that there is basically no validation of any type, which is...not great.

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

curl -X POST localhost:3000/api/item_category -d '{"item_id": 20, "category_id": 1}' -H 'Content-Type:application/json'

curl -X DELETE localhost:3000/api/item_category/1 

curl localhost:3000/api/items_categories?item_id=2

curl localhost:3000/api/items_categories?category_id=1

curl 'localhost:3000/api/items_categories?category_id=1&item_id=2'



# docker_test

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
- items can have categories, which isn't really supported or exposed

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

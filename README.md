# docker_test
testing

TODO: create the endpoints and list them here

# ports
to change the port, change the docker mapping, or pass it in to the node app as an argument, eg:

node app.js 1337

# docker
there's a dockerfile.

TODO not sure about these steps but thats a later problem
docker build . -t greg/docker-test
docker run -p 6969:3000 greg/docker-test

TODO: add postgres to the dockerfile

# "tests"
note that there is basically no validation of any type, which is...not great.

curl -X POST localhost:3000/api/item -d '{"name":"bar"}' -H 'Content-Type:application/json'

curl localhost:3000/api/items

curl localhost:3000/api/item/2

curl -X DELETE localhost:3000/api/item/2

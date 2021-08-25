# docker_test
testing

TODO: create the endpoints and list them here

# ports
to change the port, change the docker mapping, or pass it in to the node app as an argument, eg:
node app.js 1337

# docker
there's a dockerfile.
docker build . -t greg/docker-test
docker run -p 6969:3000 greg/docker-test

TODO: make docker watch this directory, or mount the thing so i dont have to build/restart so much
TODO: ok yeah i have no idea how this thing is supposed to work, so let's just do the code first and then set up docker after


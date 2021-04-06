- Build an image:
docker build -t <repository_name>:<tag> .

- Start the containers:
docker-compose up

- Stop the containers:
docker-compose down

- Access to a container:
docker exec -it <container_name> sh

- Remove an image:
docker rmi -f <image_id>

- Remove dangling images:
docker image prune

- List all images:
docker images

- List all containers:
docker ps
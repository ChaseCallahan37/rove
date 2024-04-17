
#!/bin/bash

# Get the absolute path to the web_api directory that contains the docker-compose.yml
# Assuming the script is located in web_api/bash and you are running it from there
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && cd .. && pwd )"

echo "Starting Docker services..."
# Start Docker Compose services and immediately follow the log output
docker-compose -f "$DIR/docker-compose.yml" -f "$DIR/docker-compose.dev.yml" up > "$DIR/docker-compose.log" 2>&1 &

# Store the PID of the background process
DOCKER_PID=$!

# Check if Docker Compose starts up successfully
if [ $? -eq 0 ]; then
    echo "Docker services started successfully and logging to $DIR/docker-compose.log"
else
    echo "Failed to start Docker services."
    exit 1
fi

echo "Running in dev mode"

# Optional: Tail the log in the foreground to continue monitoring it
tail -f "$DIR/docker-compose.log"

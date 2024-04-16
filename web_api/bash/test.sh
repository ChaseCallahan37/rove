#!/bin/bash

# Get the absolute path to the web_api directory that contains the docker-compose.yml
# Assuming the script is located in web_api/bash and you are running it from there
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && cd .. && pwd )"

echo "Starting Docker services..."
# Start Docker Compose services
docker-compose -f "$DIR/docker-compose.yml" up -d

# Check if Docker Compose starts up successfully
if [ $? -eq 0 ]; then
    echo "Docker services started successfully."
else
    echo "Failed to start Docker services."
    exit 1
fi

echo "Running mix tests..."
# Run mix tests
cd "$DIR"
mix test

# Capture the exit code of mix test
TEST_EXIT_CODE=$?

# Stop Docker services after tests
echo "Stopping Docker services..."
docker-compose -f "$DIR/docker-compose.yml" down

# Exit with the exit code of the mix test
exit $TEST_EXIT_CODE

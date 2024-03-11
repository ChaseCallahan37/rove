#!/bin/bash

# Stop the PostgreSQL container and remove its volumes
echo "Stopping PostgreSQL container and removing its volumes..."
docker-compose down -v

# Check if the command executed successfully
if [ $? -ne 0 ]; then
    echo "Failed to stop the PostgreSQL container and remove its volumes."
    exit 1
fi

echo "PostgreSQL container and volumes have been removed successfully."

#!/bin/bash

# Stop the PostgreSQL container
echo "Stopping PostgreSQL container..."
docker-compose stop db

# Check if the PostgreSQL container stopped successfully
if [ $? -ne 0 ]; then
    echo "Failed to stop the PostgreSQL container."
    exit 1
fi

echo "PostgreSQL container stopped successfully."

#!/bin/bash

# Start the PostgreSQL container
echo "Starting PostgreSQL container..."
docker-compose up -d db

# Check if the PostgreSQL container started successfully
if [ $? -ne 0 ]; then
    echo "Failed to start the PostgreSQL container."
    exit 1
fi

echo "PostgreSQL container started successfully."

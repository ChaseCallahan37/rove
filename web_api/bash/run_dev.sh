#!/bin/bash

# Run start_db.sh script
./bash/start_db.sh

# Check if start_db.sh succeeded
if [ $? -eq 0 ]; then
    echo "Database started successfully. Starting Phoenix server..."
    # Run the Phoenix server
    source ./.env
    mix phx.server
else
    echo "Failed to start database. Aborting..."
    exit 1
fi

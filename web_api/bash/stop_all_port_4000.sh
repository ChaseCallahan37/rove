#!/bin/bash

# Identify and kill processes listening on port 4000

# Find PIDs of processes listening on port 4000 and kill them forcefully
lsof -ti:4000 | xargs -r kill -9

echo "All processes running on port 4000 have been stopped."

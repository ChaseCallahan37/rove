#!/bin/bash

# Load environment variables
source ./.env/app.prod.env

export CONTAINER_NAME="rove-api-prod"

docker build -t $CONTAINER_NAME .

docker run -e MIX_ENV="prod" \
    -e PORT=$PORT \
    -e PHX_HOST=$PHX_HOST \
    -e SECRET_KEY_BASE=$SECRET_KEY_BASE \
    -e SIGNING_SALT=$SIGNING_SALT \
    -e GUARDIAN_SECRET_KEY=$GUARDIAN_SECRET_KEY \
    -e GOOGLE_MAPS_API_KEY=$GOOGLE_MAPS_API_KEY \
    -e DATABASE_URL=$DATABASE_URL \
    -e DATABASE_SERVER_NAME=$DATABASE_SERVER_NAME \
    --rm \
    -p 4000:4000 \
    $CONTAINER_NAME 
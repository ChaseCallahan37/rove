#!/bin/bash
echo "HERE"

source ./.env/app.dev.env

docker-compose -f docker-compose.dev.yml up --remove-orphans
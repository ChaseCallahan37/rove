#!/bin/bash

source ./.env/app.env

docker-compose -f docker-compose.dev.yml up --remove-orphans
#!/bin/bash

source ./.env/db.env
source ./.env/app.dev.env

docker-compose -f docker-compose.dev.yml up --remove-orphans
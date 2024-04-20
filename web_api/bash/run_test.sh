#!/bin/bash

source ./.env/db.env
source ./.env/app.test.env

docker-compose -f docker-compose.test.yml up --remove-orphans -d

mix test

docker-compose -f docker-compose.test.yml down

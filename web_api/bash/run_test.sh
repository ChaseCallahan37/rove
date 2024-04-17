#!/bin/bash

source ./.env/app.test.env

docker-compose -f docker-compose.test.yml up --remove-orphans -d

mix test
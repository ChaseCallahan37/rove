#!/bin/bash

docker-compose -f docker-compose.test.yml up --remove-orphans -d

mix test
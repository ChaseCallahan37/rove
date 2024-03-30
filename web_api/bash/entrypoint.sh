#!/bin/bash
# Docker entrypoint script.

# Wait until Postgres is ready
echo "Testing if Postgres is accepting connections. ${POSTGRES_HOST} ${POSTGRES_PORT} ${POSTGRES_USER}"
while ! pg_isready -q -h $POSTGRES_HOST -p $POSTGRES_PORT -U $POSTGRES_USER
do
  echo "$(date) - waiting for database to start"
  sleep 2
done



# Automatically create the PostGIS extension if it doesn't exist.
# This SQL command checks if the extension already exists, and if not, it creates it.
echo "Ensuring PostGIS is installed..."
PGPASSWORD=$POSTGRES_PASSWORD psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DATABASE" <<-EOSQL
  CREATE EXTENSION IF NOT EXISTS postgis;
EOSQL

# Create, migrate, and seed database if it doesn't exist.
if [[ -z `psql -Atqc "\\list $POSTGRES_DATABASE"` ]]; then
  echo "Database $POSTGRES_DATABASE does not exist. Creating..."
  mix ecto.create
  mix ecto.migrate
  mix run priv/repo/seeds.exs
  echo "Database $POSTGRES_DATABASE created."
else
  echo "Database $POSTGRES_DATABASE exists. Running migrations..."
  mix ecto.migrate
  echo "Migrations completed."
fi

exec mix phx.server
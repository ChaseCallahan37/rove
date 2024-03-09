#!/bin/bash

# Run the mix command for generating a Guardian DB migration
mix guardian.db.gen.migration
mix ecto.migrate
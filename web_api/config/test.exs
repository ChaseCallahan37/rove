import Config

# Configure your database
#
# The MIX_TEST_PARTITION environment variable can be used
# to provide built-in test partitioning in CI environment.
# Run `mix help test` for more information.
config :rove_api, RoveApi.Repo,
  username: System.get_env("POSTGRES_USER"),
  password: System.get_env("POSTGRES_PASSWORD"),
  hostname: System.get_env("POSTGRES_HOST"),
  database: System.get_env("POSTGRES_DATABASE"),
  port: System.get_env("POSTGRES_PORT"),
  stacktrace: true,
  show_sensitive_data_on_connection_error: true,
  pool_size: 10,
  types: RoveApi.Repo.Types,
  pool: Ecto.Adapters.SQL.Sandbox

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :rove_api, RoveApiWeb.Endpoint,
  http: [ip: {127, 0, 0, 1}, port: 4002],
  secret_key_base: "Qs6wkCiZ5PRNH/mcGyG2ZE7iVhGYUDLSVN4G+8KwmXh7s9w+a4ftgPl6PgwWF9Uh",
  server: false

# In test we don't send emails.
config :rove_api, RoveApi.Mailer, adapter: Swoosh.Adapters.Test

# Disable swoosh api client as it is only required for production adapters.
config :swoosh, :api_client, false

# Print only warnings and errors during test
config :logger, level: :warning

# Initialize plugs at runtime for faster test compilation
config :phoenix, :plug_init_mode, :runtime

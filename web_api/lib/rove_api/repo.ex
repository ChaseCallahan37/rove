defmodule RoveApi.Repo do
  use Ecto.Repo,
    otp_app: :rove_api,
    adapter: Ecto.Adapters.Postgres
end

defmodule RoveWebApi.Repo do
  use Ecto.Repo,
    otp_app: :rove_web_api,
    adapter: Ecto.Adapters.Postgres
end

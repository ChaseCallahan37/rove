defmodule RoveApiWeb.Auth.Pipeline do
  use Guardian.Plug.Pipeline,
    otp_app: :rove_api,
    module: RoveApiWeb.Auth.Guardian,
    error_handler: RoveApiWeb.Auth.GuardianErrorHandler

  plug Guardian.Plug.VerifySession
  plug Guardian.Plug.VerifyHeader
  plug Guardian.Plug.EnsureAuthenticated
  plug Guardian.Plug.LoadResource
end

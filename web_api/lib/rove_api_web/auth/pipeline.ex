defmodule RoveApiWeb.Auth.Pipeline do
  use Guardian.Plug.Pipeline, otp_app: :rove_api
  module: RoveApiWeb.Auth.Guardian,
  error_handler: RoveApiWeb.Auth.GuardianHandlerError


end

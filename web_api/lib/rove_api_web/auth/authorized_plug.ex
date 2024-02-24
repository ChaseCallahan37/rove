defmodule RoveApiWeb.Auth.AuthorizedPlug do
  alias RoveApiWeb.Auth.ErrorResponse

  # This function is expecting params to contain
  def is_authorized(%{params: %{"account" => %{"id" => account_id}}} = conn, _opts) do
    IO.puts("IN is authorized")
    if conn.assigns.account.id == account_id do
      conn
    else
      raise ErrorResponse.Forbidden
    end
  end

end

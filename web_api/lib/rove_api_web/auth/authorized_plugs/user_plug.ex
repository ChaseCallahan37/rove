defmodule RoveApiWeb.Auth.AuthorizedPlugs.UserPlug do
  alias RoveApiWeb.Auth.ErrorResponse

  def is_authorized(%{assigns: %{account: account}} = conn, opts) do
    is_authorized(account, conn, opts)
  end

  # This function is expecting params to contain
  defp is_authorized(
         %{id: account_id},
         %{params: %{"account" => %{"id" => param_id}}} = conn,
         _opts
       ) do
    if account_id == param_id do
      conn
    else
      raise ErrorResponse.Forbidden
    end
  end

  defp is_authorized(
         %{user: %{id: user_id}},
         %{params: %{"user" => %{"id" => param_id}}} = conn,
         _opts
       ) do
    if user_id == param_id do
      conn
    else
      raise ErrorResponse.Forbidden
    end
  end

  defp is_authorized(
         %{id: account_id, user: %{id: user_id}},
         %{params: %{"id" => param_id}} = conn,
         _opts
       ) do
    if account_id == param_id || user_id == param_id do
      conn
    else
      raise ErrorResponse.NotFound
    end
  end
end

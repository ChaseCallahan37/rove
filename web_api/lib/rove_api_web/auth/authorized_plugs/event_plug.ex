defmodule RoveApiWeb.Auth.AuthorizedPlugs.EventPlug do
  alias RoveApi.Events
  alias RoveApiWeb.Auth.ErrorResponse

  def is_authorized(%{assigns: %{account: account}} = conn, opts) do
    is_authorized(account, conn, opts)
  end

  defp is_authorized(
         %{user: %{id: user_id}},
         %{params: %{"event" => %{"id" => event_id}}} = conn,
         _opts
       ) do
    %{owner: %{id: owner_id}} = event = Events.get_event([id: event_id], [:owner])
    if user_id == owner_id do
      conn
    else
      raise ErrorResponse.Forbidden
    end
  end

end

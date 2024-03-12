defmodule RoveApiWeb.Auth.AuthorizedPlugs.EventPlug do
  import Plug.Conn
  alias RoveApi.Events
  alias RoveApiWeb.Auth.ErrorResponse

  def init(_options) do

  end

  def is_authorized(%{assigns: %{account: account}} = conn, opts) do
    is_authorized(account, conn, opts)
  end

  # We want to check that the person who is updating the event is the owner
  # if so, we will allow them to continue, and retain the base event fields
  # in the conn
  def is_authorized(
         %{user: %{id: user_id}},
         %{params: %{"event" => %{"id" => event_id}}} = conn,
         _opts
       ) do
    %{owner: %{id: owner_id}} = event = Events.get_event([id: event_id], [:owner])
    if user_id == owner_id do
      assign(conn, :event, event)
    else
      raise ErrorResponse.Forbidden
    end
  end

end

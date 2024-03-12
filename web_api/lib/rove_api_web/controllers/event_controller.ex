defmodule RoveApiWeb.EventController do
  use RoveApiWeb, :controller

  alias RoveApi.EventAttendances.EventAttendance
  alias RoveApi.EventAttendances
  alias RoveApiWeb.Controllers.ErrorResponse
  alias RoveApi.Events
  alias RoveApi.Events.Event

  import RoveApiWeb.Auth.AuthorizedPlugs.EventPlug

  plug :is_authorized when action in [:update, :delete]

  action_fallback RoveApiWeb.FallbackController

  def index(conn, _params) do
    events = Events.list_events()
    render(conn, :index, events: events)
  end

  def create(%{assigns: %{account: %{user: user}}} = conn, %{"event" => event_params}) do
    with {:ok, %Event{} = event} <- Events.create_event(user, event_params) do
      conn
      |> put_status(:created)
      |> render(:show, event: event)
    end
  end

  def show(conn, %{"id" => id}) do
    case Events.get_event([id: id], [:attendees, :owner]) do
      %Event{} = event ->
        conn
        |> put_status(:ok)
        |> render(:show, event: event)

      _error ->
        raise ErrorResponse.NotFound
    end
  end

  def update(conn, %{"id" => id, "event" => event_params}) do
    event = Events.get_event(id: id)

    with {:ok, %Event{} = event} <- Events.update_event(event, event_params) do
      render(conn, :show, event: event)
    end
  end

  def delete(conn, %{"id" => id}) do
    event = Events.get_event(id: id)

    with {:ok, %Event{}} <- Events.delete_event(event) do
      send_resp(conn, :no_content, "")
    end
  end

  def join(conn, %{"event" => %{"id" => event_id}}) do
    %{assigns: %{account: %{user: %{id: attendee_id}}}} = conn

    with {:ok, %EventAttendance{} = _event_attendance} <-
           EventAttendances.create_attendance(%{attendee_id: attendee_id, event_id: event_id}) do
      conn
      |> put_status(:ok)
      |> send_resp(:no_content, "")
    end
  end
end

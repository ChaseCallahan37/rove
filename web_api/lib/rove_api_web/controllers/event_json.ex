defmodule RoveApiWeb.EventJSON do
  alias RoveApi.EventAttendances.EventAttendance
  alias RoveApi.Users.User
  alias RoveApiWeb.UserJSON
  alias RoveApi.Events.Event

  @doc """
  Renders a list of events.
  """
  def index(%{events: events}) do
    %{data: for(event <- events, do: data(event))}
  end

  @doc """
  Renders a single event.
  """
  def show(%{event: event}) do
    %{
      data: data(event)
    }
  end

  def data(%Event{owner: _owner} = event) do
    {owner, popped_event} = Map.pop(event, :owner)


    %{owner: UserJSON.data(owner)}
    |> Map.merge(data(popped_event))
  end

  def data(%Event{attendees: attendees} = event) when is_list(attendees) do
    {attendees, popped_event} = Map.pop(event, :attendees)

    %{attendees: for(attendee <- attendees, do: UserJSON.data(attendee))}
    |> Map.merge(data(popped_event))
  end

  def data(%Event{} = event) do
    %{
      id: event.id,
      title: event.title,
      date: event.date,
      latitude: event.latitude,
      longitude: event.longitude
    }
  end

  def data(%{}), do: %{}
end

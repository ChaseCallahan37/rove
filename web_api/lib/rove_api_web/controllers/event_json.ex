defmodule RoveApiWeb.EventJSON do
  alias RoveApiWeb.TagJSON
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

  def data(%Event{owner: %User{}} = event) do
    {owner, popped_event} = Map.pop(event, :owner)

    %{owner: UserJSON.data(owner)}
    |> Map.merge(data(popped_event))
  end

  def data(%Event{attendees: attendees} = event) when is_list(attendees) do
    {attendees, popped_event} = Map.pop(event, :attendees)

    %{attendees: for(attendee <- attendees, do: UserJSON.data(attendee.attendee))}
    |> Map.merge(data(popped_event))
  end

  def data(%Event{tags: tags} = event) when is_list(tags) do
    {event_tags, popped_event} = Map.pop(event, :tags)

    %{tags: for(event_tag <- event_tags, do: TagJSON.data(event_tag.tag))}
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

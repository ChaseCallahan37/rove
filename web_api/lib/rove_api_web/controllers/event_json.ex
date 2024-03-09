defmodule RoveApiWeb.EventJSON do
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
    IO.inspect(event)
    %{
      data: data(event)
    }
  end

  def data(%Event{owner: %User{}} = event) do
    {owner, popped_event} = Map.pop(event, :owner)

    data(popped_event)
    |> Map.merge(%{owner: UserJSON.data(owner)})
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
end

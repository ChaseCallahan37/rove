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
    %{
      data: data(event)
    }
  end

  def data(%Event{user: %User{} = user} = event) do
    %{
      id: event.id,
      title: event.title,
      date: event.date,
      latitude: event.latitude,
      longitude: event.longitude,
      user: UserJSON.data(user)
    }
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

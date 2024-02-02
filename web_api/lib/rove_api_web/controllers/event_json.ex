defmodule RoveApiWeb.EventJSON do
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
    %{data: data(event)}
  end

  defp data(%Event{} = event) do
    %{
      id: event.id,
      title: event.title,
      date: event.date,
      latitude: event.latitude,
      longitude: event.longitude
    }
  end
end

defmodule RoveApi.EventsFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `RoveApi.Events` context.
  """

  @doc """
  Generate a event.
  """
  def event_fixture(attrs \\ %{}) do
    {:ok, event} =
      attrs
      |> Enum.into(%{
        date: ~D[2024-02-02],
        latitude: 120.5,
        longitude: 120.5,
        title: "some title"
      })
      |> RoveApi.Events.create_event()

    event
  end
end

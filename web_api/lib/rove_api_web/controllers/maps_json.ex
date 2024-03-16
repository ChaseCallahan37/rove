defmodule RoveApiWeb.MapsJSON do
  alias RoveApi.Maps.Place

  def index(%{places: places}) do
    %{data: for(place <- places, do: data(place))}
  end

  def data(%Place{} = place) do
    %{
      name: place.name,
      latitude: place.latitude,
      longitude: place.longitude,
      address: place.address,
      icon: %{url: place.icon.url, bg_color: place.icon.bg_color}
    }
  end

  def data(%{}) do
  end
end

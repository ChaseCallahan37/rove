defmodule RoveApiWeb.MapsController do
  alias RoveApi.Maps.Place
  use RoveApiWeb, :controller

  action_fallback RoveApiWeb.FallbackController

  def search(conn, params) do
    %{"search" => %{"query" => query}} = params
    places = Place.text_search(query)

    conn
    |> render(:index, places: places)
  end

end

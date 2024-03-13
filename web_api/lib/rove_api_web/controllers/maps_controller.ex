defmodule RoveApiWeb.MapsController do
  alias RoveApi.Maps.Place
  use RoveApiWeb, :controller

  action_fallback RoveApiWeb.FallbackController

  def search(conn, params) do
    %{"search" => %{"input" => input}} = params
    places = Place.text_search(input)

    conn
    |> render(:index, places: places)
  end

end

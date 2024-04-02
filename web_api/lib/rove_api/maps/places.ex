defmodule RoveApi.Maps.Place do
  @google_api_key System.get_env("GOOGLE_MAPS_API_KEY")

  defstruct address: nil,
            name: nil,
            icon: %{url: nil, bg_color: nil},
            latitude: nil,
            longitude: nil

  alias RoveApi.Maps.Place

  def text_search(query) do
    url =
      "https://maps.googleapis.com/maps/api/place/textsearch/json?key=#{@google_api_key}&query=#{String.replace(query, " ", "%20")}"

    case HTTPoison.get(url) do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        parse_text_search(body)

      {:ok, %HTTPoison.Response{status_code: status_code}} ->
        {:error, "Request failed with status code #{status_code}"}

      {:error, %HTTPoison.Error{reason: reason}} ->
        {:error, "Request failed with reason #{inspect(reason)}"}
    end
  end

  defp parse_text_search([result | rest], agg) do
    %{
      "formatted_address" => address,
      "icon" => icon_url,
      "icon_background_color" => icon_bg_color,
      "name" => name,
      "geometry" => %{"location" => %{"lat" => latitude, "lng" => longitude}}
    } = result

    parsed_result = %Place{
      address: address,
      icon: %{url: icon_url, bg_color: icon_bg_color},
      name: name,
      latitude: latitude,
      longitude: longitude
    }

    parse_text_search(rest, [parsed_result | agg])
  end

  defp parse_text_search([], agg) do
    Enum.reverse(agg)
  end

  defp parse_text_search(body) when is_bitstring(body) do
    {:ok, %{"results" => results}} = Jason.decode(body)

    parse_text_search(results, [])
  end
end

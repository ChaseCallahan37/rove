defmodule RoveApi.Search.Events do
  import Ecto.Query, only: [dynamic: 2, from: 2, subquery: 2]
  alias RoveApi.EventTags.EventTag

  def build_conditions(params) do
    build_conditions(params, true)
  end

  defp build_conditions(%{"start_date" => _start_date} = params, conditions) do
    {start_date, popped_params} = Map.pop(params, "start_date")

    start_date = Date.from_iso8601!(start_date)

    build_conditions(popped_params, dynamic([e], e.date >= ^start_date and ^conditions))
  end

  defp build_conditions(%{"end_date" => _end_date} = params, conditions) do
    {end_date, popped_params} = Map.pop(params, "end_date")

    end_date = Date.from_iso8601!(end_date)

    build_conditions(popped_params, dynamic([e], e.date <= ^end_date and ^conditions))
  end

  defp build_conditions(%{"tags" => _tags} = params, conditions) do
    {tags, popped_params} = Map.pop(params, "tags")

    tags_query = from( et in EventTag,
                          join: t in assoc(et, :tag),
                          where: t.name in ^tags,
                          select: et.event_id)

    build_conditions(popped_params, dynamic([e], e.id in subquery(tags_query) and ^conditions))
  end

  defp build_conditions(%{"location" => %{"latitude" => latitude, "longitude" => longitude, "radius" => radius}} = params, conditions) do
    {_location, popped_params} = Map.pop(params, "location")

    latitude = String.to_float(latitude)
    longitude = String.to_float(longitude)
    radius = String.to_float(radius)

    # build_conditions(popped_params, dynamic([e],
    #   ^radius >= calculate_distance({e.latitude, e.longitude}, {^latitude, ^longitude})
    #   and ^conditions))
  end

  def calculate_distance(coord1, coord2) do
    {lat1, lon1} = coord1
    {lat2, lon2} = coord2

    delta_lat = deg2rad(lat2 - lat1)
    delta_lon = deg2rad(lon2 - lon1)

    a = :math.sin(delta_lat / 2) * :math.sin(delta_lat / 2) +
        :math.cos(deg2rad(lat1)) * :math.cos(deg2rad(lat2)) *
        :math.sin(delta_lon / 2) * :math.sin(delta_lon / 2)

    c = 2 * :math.atan2(:math.sqrt(a), :math.sqrt(1 - a))

    radius_of_earth_km = 6371
    radius_of_earth_km * c
  end

  defp deg2rad(deg), do: deg * (:math.pi / 180)

  defp build_conditions(_params, conditions) do
    conditions
  end
end

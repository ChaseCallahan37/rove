defmodule RoveApi.Search.Events do
  # import Ecto.Query, only: [dynamic: 2, from: 2, subquery: 2, fragment: 1]
  import Ecto.Query
  alias Geo.{Point, PostGIS}
  require Geo.PostGIS
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

    point = %Point{coordinates: {longitude, latitude}, srid: 4326}

    build_conditions(popped_params, dynamic([e], PostGIS.st_dwithin(e.location, ^point, ^radius)  and ^conditions))
  end

  defp build_conditions(_params, conditions) do
    conditions
  end
end

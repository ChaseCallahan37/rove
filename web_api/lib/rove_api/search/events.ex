defmodule RoveApi.Search.Events do


  def build_query(conditions) do
    build_query(conditions, [])
  end

  defp build_query(%{"start_date" => _start_date} = conditions, criteria) do
    {start_date, popped_conditions} = Map.pop(conditions, "start_date")

    build_query(popped_conditions, Enum.concat(criteria, [date: start_date]))
  end

  defp build_query(_conditions, criteria) do
    criteria
  end
end

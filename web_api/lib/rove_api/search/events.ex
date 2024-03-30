defmodule RoveApi.Search.Events do
  import Ecto.Query, only: [dynamic: 2]

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

  defp build_conditions(_params, conditions) do
    conditions
  end
end

defmodule RoveApi.Search.Events do
  import Ecto.Query, only: [dynamic: 2]

  def build_conditions(params) do
    build_conditions(params, false)
  end

  defp build_conditions(%{"start_date" => _start_date} = params, conditions) do
    {start_date, popped_params} = Map.pop(params, "start_date")

    start_date = Date.from_iso8601!(start_date)

    build_conditions(popped_params, dynamic([e], e.date >= ^start_date or ^conditions))
  end

  defp build_conditions(_params, conditions) do
    conditions
  end
end

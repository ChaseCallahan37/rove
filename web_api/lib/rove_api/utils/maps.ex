defmodule RoveApi.Utils.Maps do
  def map_type(%{} = map) do
    case Map.keys(map)
         |> Enum.at(0) do
      nil ->
        {:error, :empty_map}

      value ->
        if Kernel.is_atom(value) do
          {:ok, :atom}
        else
          {:ok, :bitstring}
        end
    end
  end

  @spec fields_lower(map(), maybe_improper_list()) :: any()
  def fields_lower(%{} = map, fields) when is_list(fields) do
    fields =
      case map_type(map) do
        {:ok, :atom} -> fields
        {:ok, :bitstring} -> Enum.map(fields, &Atom.to_string/1)
      end

    fields
    |> Enum.reduce(map, fn field, curr_map ->
      Map.update!(curr_map, field, fn existing_value -> String.downcase(existing_value) end)
    end)
  end
end

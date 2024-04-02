defmodule RoveApi.Utils.Conversions do
  def to_date(str) when is_binary(str) do
    case Date.from_iso8601(str) do
      {:ok, date} -> {:ok, date}
      _ -> to_date_time(str)
    end
  end

  def to_date_time(str) when is_binary(str) do
    case DateTime.from_iso8601(str) do
      {:ok, date_time, _} -> {:ok, date_time}
      _ -> {:error, :invalid_date}
    end
  end
end

defmodule RoveApi.EventAttendances do
  @moduledoc """
  The Users context.
  """

  import Ecto.Query, warn: false
  alias RoveApi.Repo
  alias RoveApi.EventAttendances.EventAttendance

  def create_attendance(attrs \\ %{}) do
    %EventAttendance{}
    |> EventAttendance.changeset(attrs)
    |> Repo.insert()
  end
end

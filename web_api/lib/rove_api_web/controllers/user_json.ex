defmodule RoveApiWeb.UserJSON do
  alias RoveApi.EventAttendances.EventAttendance
  alias RoveApi.Events.Event
  alias RoveApi.Users.User
  alias RoveApi.Users.User
  alias RoveApiWeb.EventJSON

  @doc """
  Renders a list of user.
  """
  def index(%{user: user}) do
    %{data: for(user <- user, do: data(user))}
  end

  @doc """
  Renders a single user.
  """
  def show(%{user: user}) do
    IO.puts("IN SHOw")
    IO.inspect(user)
    %{data: data(user)}
  end

  def data(%{events_created: events} = user) when is_list(events) do
    {events, popped_user} = Map.pop(user, :events_created)

    %{events_created: for(event <- events, do: EventJSON.data(event))}
    |> Map.merge(data(popped_user))
  end

  def data(%{attendances: attendances} = user) when is_list(attendances) do
    {attendances, popped_user} = Map.pop(user, :attendances)

    %{attendances: for(attendance <- attendances, do: EventJSON.data(attendance.event))}
    |> Map.merge(data(popped_user))
  end

  def data(%User{} = user) do
    %{
      id: user.id,
      user_name: user.user_name,
      dob: user.dob,
      first_name: user.first_name,
      last_name: user.last_name,
      gender: user.gender
    }
  end

  def data(%{}), do: %{}
end

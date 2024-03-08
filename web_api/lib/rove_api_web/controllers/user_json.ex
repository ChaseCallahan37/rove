defmodule RoveApiWeb.UserJSON do
  alias RoveApiWeb.EventJSON
  alias RoveApi.Users.User

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
    %{data: data(user)}
  end

  def data(%User{events_created: events} = user) when is_list(events) do
    {events, popped_user} = Map.pop(user, :events_created)

    data(popped_user)
    |> Map.merge(%{events_created: for(event <- events, do: EventJSON.data(event))})
  end

  def data(%User{attendances: attendances} = user) when is_list(attendances) do
    {attendances, popped_user} = Map.pop(user, :attendances)

    data(popped_user)
    |> Map.merge(%{attendances: for(attendance <- attendances, do: EventJSON.data(attendance.event))})
  end

  def data(%User{} = user) do
    %{
      id: user.id,
      user_name: user.user_name
    }
  end
end

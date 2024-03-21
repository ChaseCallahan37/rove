defmodule RoveApiWeb.UserJSON do
  alias RoveApiWeb.TagJSON
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

  def data(%{tags: tags} = user) when is_list(tags) do
    {user_tags, popped_user} = Map.pop(user, :tags)

    %{tags: for(user_tag <- user_tags, do: TagJSON.data(user_tag.tag))}
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

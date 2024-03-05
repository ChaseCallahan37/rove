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

  def data(%User{events: events} = user) when is_list(events) do
    {events, popped_user} = Map.pop(user, :events)
    IO.inspect(popped_user)
       Map.merge(
        data(popped_user),
        %{events: for(event <- events, do: IO.inspect(event) |> EventJSON.data())}
        )

  end

  def data(%User{} = user) do
    %{
      id: user.id,
      user_name: user.user_name
    }
  end

end

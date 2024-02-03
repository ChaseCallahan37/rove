defmodule RoveApi.UsersFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `RoveApi.Users` context.
  """

  @doc """
  Generate a user.
  """
  def user_fixture(attrs \\ %{}) do
    {:ok, user} =
      attrs
      |> Enum.into(%{
        user_name: "some user_name"
      })
      |> RoveApi.Users.create_user()

    user
  end
end

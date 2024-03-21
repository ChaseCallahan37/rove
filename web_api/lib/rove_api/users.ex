defmodule RoveApi.Users do
  @moduledoc """
  The Users context.
  """

  import Ecto.Query, warn: false

  alias RoveApi.UserTags
  alias RoveApi.Repo
  alias RoveApi.Users.User

  @doc """
  Returns the list of user.

  ## Examples

      iex> list_user()
      [%User{}, ...]

  """
  def list_user(include \\ []) do
    User
    |> preload(^include)
    |> Repo.all()
  end

  def get_user(criteria, include \\ []) do
    try do
      User
      |> where(^criteria)
      |> preload(^include)
      |> Repo.one()
    rescue
      Ecto.Query.CastError -> {:error, :cast_failed}
    end
  end

  @doc """
  Creates a user.

  ## Examples

      iex> create_user(%{field: value})
      {:ok, %User{}}

      iex> create_user(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_user(account, attrs \\ %{}) do
    account
    |> Ecto.build_assoc(:user)
    |> User.changeset(attrs)
    |> Repo.insert()
  end

  def update_user(%User{} = user, %{"tags" => _tag_ids, "id" => user_id} = attrs) do
    {tag_ids, popped_attrs} = Map.pop(attrs, "tags")

    Repo.transaction(fn ->
      try do
        {_num, nil} = UserTags.remove_existing_tags(user_id)
        {_num, nil} = UserTags.add_tags(user_id, tag_ids)
        {:ok, updated_user} = update_user(user, popped_attrs)

        updated_user
      rescue
        e ->
          IO.inspect(e)
          {:error, e}
      end
    end)
  end
  @doc """
  Updates a user.

  ## Examples

      iex> update_user(user, %{field: new_value})
      {:ok, %User{}}

      iex> update_user(user, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_user(%User{} = user, attrs) do
    user
    |> User.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a user.

  ## Examples

      iex> delete_user(user)
      {:ok, %User{}}

      iex> delete_user(user)
      {:error, %Ecto.Changeset{}}

  """
  def delete_user(%User{} = user) do
    Repo.delete(user)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking user changes.

  ## Examples

      iex> change_user(user)
      %Ecto.Changeset{data: %User{}}

  """
  def change_user(%User{} = user, attrs \\ %{}) do
    User.changeset(user, attrs)
  end
end

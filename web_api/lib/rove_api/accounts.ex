defmodule RoveApi.Accounts do
  @moduledoc """
  The Accounts context.
  """

  import Ecto.Query, warn: false
  alias RoveApi.Users
  alias RoveApi.Repo

  alias RoveApi.Utils
  alias RoveApi.Accounts.Account

  @doc """
  Returns the list of account.

  ## Examples

      iex> list_account()
      [%Account{}, ...]

  """
  def list_account(include \\ []) do
    Account
    |> preload(^include)
    |> Repo.all()
  end

  def get_account(criteria, include \\ []) do
    try do
      Account
      |> where(^criteria)
      |> preload(^include)
      |> Repo.one()
    rescue
      Ecto.Query.CastError -> {:error, :cast_failed}
    end
  end

  @doc """
  Creates a account.

  ## Examples

      iex> create_account(%{field: value})
      {:ok, %Account{}}

      iex> create_account(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_account(attrs \\ %{}) do
    Repo.transaction(fn ->
      case execute_create_account(attrs) do
        {:ok, account} ->
          case Users.create_user(account, attrs) do
            {:ok, user} -> {account, user}
            {:error, user_error} -> Repo.rollback(user_error)
          end

        {:error, account_error} ->
          Repo.rollback(account_error)
      end
    end)
  end

  defp execute_create_account(attrs) do
    %Account{}
    |> Account.changeset(Utils.Maps.fields_lower(attrs, [:email]))
    |> Repo.insert()
  end

  @doc """
  Updates a account.

  ## Examples

      iex> update_account(account, %{field: new_value})
      {:ok, %Account{}}

      iex> update_account(account, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_account(%Account{} = account, attrs) do
    account
    |> Account.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a account.

  ## Examples

      iex> delete_account(account)
      {:ok, %Account{}}

      iex> delete_account(account)
      {:error, %Ecto.Changeset{}}

  """
  def delete_account(%Account{} = account) do
    Repo.delete(account)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking account changes.

  ## Examples

      iex> change_account(account)
      %Ecto.Changeset{data: %Account{}}

  """
  def change_account(%Account{} = account, attrs \\ %{}) do
    Account.changeset(account, attrs)
  end
end

defmodule RoveApi.Accounts do
  @moduledoc """
  The Accounts context.
  """

  import Ecto.Query, warn: false
  alias Mix.Ecto
  alias Phoenix.Ecto
  alias Mix.Ecto
  alias ElixirSense.Plugins.Ecto
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
  def list_account do
    Repo.all(Account)
  end

  @doc """
  Gets a single account.

  Raises `Ecto.NoResultsError` if the Account does not exist.

  ## Examples

      iex> get_account!(123)
      %Account{}

      iex> get_account!(456)
      ** (Ecto.NoResultsError)

  """
  def get_account!(id) when is_bitstring(id), do: Repo.get!(Account, id)

  def get_full_account(id) do
    Account
    |> where(id: ^id)
    |> preload([:user])
    |> Repo.one()
  end

  @doc """
  Gets a single account.any()

  Returns `nil` if the account does not exist.

  ##  Examples

    iex> get_account_by_email("test@email.com")
    %Account{}

    iex> get_account_by_email("no_account@email.com")
    nil
  """
  def get_account_by_email(email) do
    # We do not care about the casing of the email when matching
    with email_lower <- String.downcase(email) do
      Account
      |> where(email: ^email_lower)
      |> preload([:user])
      |> Repo.one()
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
            {:error, user_error} ->  Repo.rollback(user_error)
          end
        {:error, account_error} -> Repo.rollback(account_error)
      end
    end)
  end

  defp execute_create_account(attrs \\ %{}) do
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

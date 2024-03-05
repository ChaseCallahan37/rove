defmodule RoveApiWeb.AccountJSON do
  alias RoveApiWeb.UserJSON
  alias RoveApi.Accounts.Account
  alias RoveApi.Users.User

  @doc """
  Renders a list of account.
  """
  def index(%{account: account}) do
    %{data: for(account <- account, do: data(account))}
  end

  def show(%{account: account, token: token}) do
    %{data: data(account, token)}
  end

  @doc """
  Renders a single account.
  """
  def show(%{account: account}) do
    %{data: data(account)}
  end

  def data(%Account{user: %User{}} = account) do
    {user, popped_account} = Map.pop(account, :user)

    data(popped_account)
    |> Map.merge(%{user: UserJSON.data(user)})
  end

  def data(%Account{} = account) do
    %{
      id: account.id,
      email: account.email
    }
  end

  def data(%Account{} = account, token) do
    %{
      token: token,
      account: data(account)
    }
  end
end

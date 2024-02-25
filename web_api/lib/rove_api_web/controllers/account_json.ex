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

  defp data(%Account{user: %User{} = user} = account) do
    %{
      id: account.id,
      email: account.email,
      user: UserJSON.data(user)
    }
  end


  defp data(%Account{} = account) do
    %{
      id: account.id,
      email: account.email,
    }
  end
  def data(%Account{} = account, token) do
      %{
        token: token,
        account: data(account)
      }
  end
end

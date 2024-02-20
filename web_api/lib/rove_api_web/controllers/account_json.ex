defmodule RoveApiWeb.AccountJSON do
  alias RoveApi.Accounts.Account

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

  defp data(%Account{} = account) do
    %{
      id: account.id,
      email: account.email,
    }
  end

  def data(%Account{} = account, token) do
    Map.merge(
      %{
        token: token
      },
      data(account)
    )
  end
end

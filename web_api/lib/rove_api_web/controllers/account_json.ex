defmodule RoveApiWeb.AccountJSON do
  alias RoveApi.Accounts.Account

  @doc """
  Renders a list of account.
  """
  def index(%{account: account}) do
    %{data: for(account <- account, do: data(account))}
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
      hash_password: account.hash_password
    }
  end
end

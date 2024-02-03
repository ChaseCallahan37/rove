defmodule RoveApi.Accounts.Account do
  use Ecto.Schema
  import Ecto.Changeset

  schema "account" do
    field :email, :string
    field :hash_password, :string

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(account, attrs) do
    account
    |> cast(attrs, [:email, :hash_password])
    |> validate_required([:email, :hash_password])
  end
end

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
    |> validate_format(:email, ~r/^[^\s]+@[^\s]+$/, message: "Must include the @ symbol and no spaces when creating an email")
    |> validate_length(:email, max: 160)
    |> unique_constraint(:email)
  end
end

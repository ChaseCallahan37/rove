defmodule RoveApi.Accounts.Account do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  schema "accounts" do
    field :email, :string
    field :hash_password, :string
    has_one :user, RoveApi.Users.User

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

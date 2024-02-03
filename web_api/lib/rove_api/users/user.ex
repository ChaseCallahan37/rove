defmodule RoveApi.Users.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "user" do
    field :user_name, :string
    field :account_id, :id

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:user_name])
    |> validate_required([:user_name])
  end
end

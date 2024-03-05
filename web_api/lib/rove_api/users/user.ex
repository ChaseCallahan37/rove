defmodule RoveApi.Users.User do
  use Ecto.Schema
  import Ecto.Changeset


  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "users" do
    field :user_name, :string
    field :dob, :date
    field :first_name, :string
    field :last_name, :string
    field :gender, Ecto.Enum, values: [:male, :female, :other]
    belongs_to :account, RoveApi.Accounts.Account
    has_many :events, RoveApi.Events.Event

    timestamps(type: :utc_datetime)
  end

  @spec changeset(
          {map(), map()}
          | %{
              :__struct__ => atom() | %{:__changeset__ => map(), optional(any()) => any()},
              optional(atom()) => any()
            },
          :invalid | %{optional(:__struct__) => none(), optional(atom() | binary()) => any()}
        ) :: Ecto.Changeset.t()
  @doc false
  def changeset(user, attrs) do
    IO.inspect(user)
    IO.inspect(attrs)
    user
    |> cast(attrs, [:account_id, :user_name, :dob, :first_name, :last_name, :gender])
    |> validate_required([:account_id])
  end
end

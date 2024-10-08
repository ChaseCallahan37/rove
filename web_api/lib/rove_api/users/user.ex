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
    belongs_to :account, RoveApi.Accounts.Account, foreign_key: :account_id, type: :binary_id
    has_many :events_created, RoveApi.Events.Event, foreign_key: :owner_id
    has_many :attendances, RoveApi.EventAttendances.EventAttendance, foreign_key: :attendee_id
    has_many :tags, RoveApi.UserTags.UserTag, foreign_key: :user_id

    timestamps(type: :utc_datetime)
  end

  def changeset(user, attrs) do
    user
    |> cast(attrs, [:account_id, :user_name, :dob, :first_name, :last_name, :gender])
    |> validate_required([:account_id])
    |> unique_constraint([:user_name])
  end
end

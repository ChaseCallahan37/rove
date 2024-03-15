defmodule RoveApi.Events.Event do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "events" do
    field :date, :date
    field :title, :string
    field :latitude, :float
    field :longitude, :float
    field :description, :string
    belongs_to :owner, RoveApi.Users.User, foreign_key: :owner_id, type: :binary_id
    has_many :attendees, RoveApi.EventAttendances.EventAttendance, foreign_key: :event_id
    has_many :tags, RoveApi.EventTags.EventTag, foreign_key: :event_id
    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(event, attrs) do
    event
    |> cast(attrs, [:title, :date, :latitude, :longitude, :owner_id, :description])
    |> validate_required([:title, :date, :latitude, :longitude, :owner_id])
    |> unique_constraint([:date, :title, :owner_id],
      name: :unique_date_title_owner,
      message: "User has already created an event on this date with that title"
    )
  end
end

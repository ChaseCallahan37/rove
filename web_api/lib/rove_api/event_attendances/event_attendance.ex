defmodule RoveApi.EventAttendances.EventAttendance do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "event_attendances" do
    belongs_to :attendee, RoveApi.Users.User,
      foreign_key: :attendee_id,
      references: :id,
      type: :binary_id

    belongs_to :event, RoveApi.Events.Event,
      foreign_key: :event_id,
      references: :id,
      type: :binary_id

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(event, attrs) do
    event
    |> cast(attrs, [:attendee_id, :event_id])
    |> validate_required([:attendee_id, :event_id])
    |> unique_constraint([:attendee_id, :event_id])
  end
end

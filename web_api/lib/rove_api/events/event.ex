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
    belongs_to :event, RoveApi.Events.Event

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(event, attrs) do
    event
    |> cast(attrs, [:title, :date, :latitude, :longitude])
    |> validate_required([:title, :date, :latitude, :longitude])
  end
end

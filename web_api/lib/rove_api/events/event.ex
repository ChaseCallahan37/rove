defmodule RoveApi.Events.Event do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  schema "events" do
    field :date, :date
    field :title, :string
    field :latitude, :float
    field :longitude, :float

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(event, attrs) do
    event
    |> cast(attrs, [:title, :date, :latitude, :longitude])
    |> validate_required([:title, :date, :latitude, :longitude])
  end
end

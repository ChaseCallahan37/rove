defmodule RoveApi.EventTags.EventTag do
  alias RoveApi.EventTags.EventTag
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "event_tags" do
    belongs_to :tag, RoveApi.Tags.Tag,
      foreign_key: :tag_id,
      type: :binary_id

    belongs_to :event, RoveApi.Events.Event,
      foreign_key: :event_id,
      references: :id,
      type: :binary_id

    timestamps(type: :utc_datetime)
  end

  def changeset(attrs) do
    changeset(%EventTag{}, attrs)
  end
  @doc false
  def changeset(event_tag, attrs) do
    event_tag
    |> cast(attrs, [:tag_id, :event_id])
    |> validate_required([:tag_id, :event_id])
    |> unique_constraint([:tag_id, :event_id],
      name: :unique_event_tags,
      message: "Event has already been associated with this tag"
    )
  end
end

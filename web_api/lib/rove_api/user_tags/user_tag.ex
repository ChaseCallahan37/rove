defmodule RoveApi.UserTags.UserTag do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "user_tags" do
    belongs_to :tag, RoveApi.Tags.Tag,
      foreign_key: :tag_id,
      type: :binary_id

    belongs_to :user, RoveApi.Users.User,
      foreign_key: :user_id,
      type: :binary_id


    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(event, attrs) do
    event
    |> cast(attrs, [:tag_id, :user_id])
    |> validate_required([:tag_id, :user_id])
    |> unique_constraint([:tag_id, :user_id],
      name: :unique_user_tags,
      message: "User has already selected this tag"
    )
  end
end

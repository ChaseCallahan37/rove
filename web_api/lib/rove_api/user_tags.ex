defmodule RoveApi.UserTags do
  @moduledoc """
  The Events context.
  """
  alias RoveApi.UserTags.UserTag
  alias RoveApi.Repo

  import Ecto.Query, warn: false

  def remove_existing_tags(user_id) do
    Repo.delete_all(
      from(ut in UserTag,
        where: ut.user_id == ^user_id
      )
    )
  end

  def add_tags(user_id, tag_ids) do
    current_timestamp = DateTime.utc_now() |> DateTime.truncate(:second)

    tag_associations =
      tag_ids
      |> Enum.map(fn tag_id ->
        %{
          user_id: user_id,
          tag_id: tag_id,
          inserted_at: current_timestamp,
          updated_at: current_timestamp
        }
      end)

    UserTag
    |> Repo.insert_all(tag_associations)
  end
end

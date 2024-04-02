defmodule RoveApi.EventTags do
  @moduledoc """
  The Events context.
  """
  alias RoveApi.EventTags.EventTag
  alias RoveApi.Repo

  import Ecto.Query, warn: false

  def remove_existing_tags(event_id) do
    Repo.delete_all(
      from(et in EventTag,
        where: et.event_id == ^event_id
      )
    )
  end

  def add_tags(event_id, tag_ids) do
    current_timestamp = DateTime.utc_now() |> DateTime.truncate(:second)

    tag_associations =
      tag_ids
      |> Enum.map(fn tag_id ->
        %{
          event_id: event_id,
          tag_id: tag_id,
          inserted_at: current_timestamp,
          updated_at: current_timestamp
        }
      end)

    EventTag
    |> Repo.insert_all(tag_associations)
  end
end

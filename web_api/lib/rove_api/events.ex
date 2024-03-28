defmodule RoveApi.Events do
  @moduledoc """
  The Events context.
  """

  import Ecto.Query, warn: false

  alias RoveApi.Search
  alias RoveApi.EventTags
  alias RoveApi.Repo
  alias RoveApi.Events.Event
  alias RoveApi.Users.User

  def list_events(include, params) do
    criteria = Search.Events.build_query(params)
    IO.puts("LOOK HERERERE")
    IO.inspect(criteria)
    Event
    |> where(^criteria)
    |> preload(^include)
  end
  @doc """
  Returns the list of events.

  ## Examples

      iex> list_events()
      [%Event{}, ...]

  """
  def list_events(include \\ []) do
    Event
    |> preload(^include)
    |> Repo.all()
  end

  def get_event(criteria, include \\ []) do
    try do
      Event
      |> where(^criteria)
      |> preload(^include)
      |> Repo.one()
    rescue
      Ecto.Query.CastError -> {:error, :cast_failed}
    end
  end

  def create_event(user, attrs \\ %{})
  def create_event(%User{} = user, %{"tags" => _event_tags} = attrs) do
    {event_tags, popped_attrs} = Map.pop(attrs, "tags")

    Repo.transaction(fn ->
      {:ok, %{id: event_id} = created_event} = create_event(user, popped_attrs)
      EventTags.add_tags(event_id, event_tags)
      created_event
    end)

  end
  @doc """
  Creates a event.

  ## Examples

      iex> create_event(%{field: value})
      {:ok, %Event{}}

      iex> create_event(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_event(%User{} = user, attrs) do
    user
    |> Ecto.build_assoc(:events_created)
    |> Event.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a event.

  ## Examples

      iex> update_event(event, %{field: new_value})
      {:ok, %Event{}}

      iex> update_event(event, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """

  def update_event(event, %{"tags" => _tag_ids, "id" => event_id} = attrs) do
    {tag_ids, popped_attrs} = Map.pop(attrs, "tags")

    Repo.transaction(fn ->
      try do
        {_num, nil} = EventTags.remove_existing_tags(event_id)
        {_num, nil} = EventTags.add_tags(event_id, tag_ids)
        {:ok, updated_event} = update_event(event, popped_attrs)
        updated_event
      rescue
          e ->
            IO.inspect(e)
            {:error, e}
      end

    end)
  end

def update_event(event, attrs) do
  event
  |> Event.changeset(attrs)
  |> Repo.update()
end


  @doc """
  Deletes a event.

  ## Examples

      iex> delete_event(event)
      {:ok, %Event{}}

      iex> delete_event(event)
      {:error, %Ecto.Changeset{}}

  """
  def delete_event(%Event{} = event) do
    Repo.delete(event)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking event changes.

  ## Examples

      iex> change_event(event)
      %Ecto.Changeset{data: %Event{}}

  """
  def change_event(%Event{} = event, attrs \\ %{}) do
    Event.changeset(event, attrs)
  end
end

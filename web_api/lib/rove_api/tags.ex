defmodule RoveApi.Tags do
  @moduledoc """
  """
alias RoveApi.Repo
alias RoveApi.Tags.Tag

  import Ecto.Query, warn: false

  def list_tags() do
    Tag
    |> Repo.all()
  end

  def create_tag(attrs) do
    %Tag{}
    |> Tag.changeset(attrs)
    |> Repo.insert()
  end
end

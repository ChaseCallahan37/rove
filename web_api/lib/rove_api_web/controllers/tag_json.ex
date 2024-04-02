defmodule RoveApiWeb.TagJSON do
  def index(%{tags: tags}) do
    %{data: for(tag <- tags, do: data(tag))}
  end

  def show(%{tag: tag}) do
    %{data: data(tag)}
  end

  def data(tag) do
    %{
      id: tag.id,
      name: tag.name
    }
  end
end

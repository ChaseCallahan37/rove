defmodule RoveApiWeb.TagController do
  alias RoveApi.Tags
  alias RoveApi.Tags.Tag
  use RoveApiWeb, :controller

  action_fallback RoveApiWeb.FallbackController

  def index(conn, _params) do
    tags = Tags.list_tags()

    conn
    |> render(:index, tags: tags)
  end
  def create(conn, %{"tag" => tag_params}) do
    with {:ok, %Tag{} = tag} <- Tags.create_tag(tag_params) do
      conn
      |> put_status(:created)
      |> render(:show, tag: tag)
    end
  end

end

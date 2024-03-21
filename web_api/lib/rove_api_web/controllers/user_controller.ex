defmodule RoveApiWeb.UserController do
  use RoveApiWeb, :controller

  alias RoveApi.Users
  alias RoveApi.Users.User

  import RoveApiWeb.Auth.AuthorizedPlugs.UserPlug

  plug :is_authorized when action in [:update, :delete]

  action_fallback RoveApiWeb.FallbackController

  def index(conn, _params) do
    user = Users.list_user()
    render(conn, :index, user: user)
  end

  def show(%{assigns: %{account: %{user: %{id: user_id}}}} = conn, _params) do
    case Users.get_user([id: user_id], [tags: [:tag]]) do
      %User{} = user ->
        conn
        |> render(:show, user: user)
    end

  end

  def show_events(%{assigns: %{account: %{user: %{id: user_id}}}} = conn, _params) do
    user = Users.get_user([id: user_id], [:events_created, attendances: [:event]])

    conn
    |> render(:show, user: %{events_created: user.events_created, attendances: user.attendances})
  end

  def update(%{assigns: %{account: %{user: user}}} = conn, %{"user" => user_params}) do
    with {:ok, %User{} = updated_user} <- Users.update_user(user, user_params) do
      conn
      |> render(:show, user: updated_user)
    end
  end

  def delete(conn, %{"id" => id}) do
    user = Users.get_user(id: id)

    with {:ok, %User{}} <- Users.delete_user(user) do
      send_resp(conn, :no_content, "")
    end
  end
end

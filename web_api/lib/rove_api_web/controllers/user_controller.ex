defmodule RoveApiWeb.UserController do
  use RoveApiWeb, :controller

  alias RoveApi.Users
  alias RoveApi.Users.User

  import RoveApiWeb.Auth.AuthorizedPlug

  plug :is_authorized when action in [:show, :update, :delete]

  action_fallback RoveApiWeb.FallbackController

  def index(conn, _params) do
    user = Users.list_user()
    render(conn, :index, user: user)
  end

  def create(conn, %{"user" => user_params}) do
    with {:ok, %User{} = user} <- Users.create_user(user_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", ~p"/api/user/#{user}")
      |> render(:show, user: user)
    end
  end

  def show(conn, %{"id" => id}) do
    user = Users.get_user!(id)
    render(conn, :show, user: user)
  end

  def update(%{assigns: %{account: %{user: user}}} = conn, %{"user" => user_params}) do
    with {:ok, %User{} = updated_user} <- Users.update_user(user, user_params) do
      conn
      |> render(:show, user: updated_user)
    end
  end

  def delete(conn, %{"id" => id}) do
    user = Users.get_user!(id)

    with {:ok, %User{}} <- Users.delete_user(user) do
      send_resp(conn, :no_content, "")
    end
  end
end

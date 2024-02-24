defmodule RoveApiWeb.AccountController do
  use RoveApiWeb, :controller

  alias Hex.API.User
  alias RoveApiWeb.Auth.{Guardian, ErrorResponse}
  alias RoveApi.{Accounts, Accounts.Account, Users, Users.User}

  import RoveApiWeb.Auth.AuthorizedPlug

  # we state this so that we can check for this specific actions to be called
  # only be the authorized user
  plug :is_authorized when action in [:update, :delete]

  action_fallback RoveApiWeb.FallbackController


  def index(conn, _params) do
    account = Accounts.list_account()
    render(conn, :index, account: account)
  end

  def create(conn, %{"account" => account_params}) do
    with {:ok, %Account{} = account} <- Accounts.create_account(account_params),
          {:ok, %User{} = _user} <- Users.create_user(account, account_params) do
      conn
      # We want to call authorize account with the hash password that the caller gives us
      # We do not want to use the hash of the hash when authorizing account, since
      # authorize_account will apply the hash to the password that is passed in
      |> authorize_account(account.email, account_params['hash_password'])
    end
  end

  def refresh_session(conn, %{}) do
    token = Guardian.Plug.current_token(conn)
    {:ok, account, token} = Guardian.authenticate(token)

    conn
    |> Plug.Conn.put_session(:account_id, account.id)
    |> put_status(:ok)
    |> render(:index, %{account: account, token: token})

  end

  def sign_in(conn, %{"email" => email, "hash_password" => hash_password}) do
    conn
    |> authorize_account(email, hash_password)
  end

  defp authorize_account(conn, email, hash_password) do
    case Guardian.authenticate(email, hash_password) do
      {:ok, account, token} ->
        conn
        |> Plug.Conn.put_session(:account_id, account.id)
        |> put_status(:ok)
        |> render(:show, %{account: account, token: token})
      {:error, :unauthorized} -> raise ErrorResponse.Unauthorized, message: "Email or password incorrect."
    end
  end

  def sign_out(conn, %{}) do
    account = conn.assigns[:account]
    token = Guardian.Plug.current_token(conn)
    Guardian.revoke(token)
    conn
    |> Plug.Conn.clear_session()
    |> put_status(:ok)
    |> render(:show, %{account: account, token: nil})
  end

  def current_account(%{assigns: %{account: account}} = conn, %{}) do
    conn
    |> put_status(:ok)
    |> render(:show, account: account)
  end

  def show(conn, %{"id" => id}) do
    account = Accounts.get_full_account(id)
    render(conn, :show, account: account)
  end

  def update(%{assigns: %{account: %Account{} = account}} = conn, %{"current_hash" => current_hash ,"account" => account_params}) do
    if Guardian.validate_password(current_hash, account.hash_password) do
      {:ok, updated_account} = Accounts.update_account(account, account_params)
      conn
      |> render(:show, account: updated_account)
    else
      raise ErrorResponse.Unauthorized, message: "Password incorrect"
    end
  end

  def delete(conn, %{"id" => id}) do
    account = Accounts.get_account!(id)

    with {:ok, %Account{}} <- Accounts.delete_account(account) do
      send_resp(conn, :no_content, "")
    end
  end
end

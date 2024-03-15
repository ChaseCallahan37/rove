defmodule RoveApiWeb.FallbackController do
  @moduledoc """
  Translates controller action results into valid `Plug.Conn` responses.

  See `Phoenix.Controller.action_fallback/1` for more details.
  """
  use RoveApiWeb, :controller

  # This clause handles errors returned by Ecto's insert/update/delete.
  def call(conn, {:error, %Ecto.Changeset{} = changeset}) do
    conn
    |> put_status(:unprocessable_entity)
    |> put_view(json: RoveApiWeb.ChangesetJSON)
    |> render(:error, changeset: changeset)
  end

  # This clause is an example of how to handle resources that cannot be found.
  def call(conn, {:error, :not_found}) do
    conn
    |> put_status(:not_found)
    |> put_view(html: RoveApiWeb.ErrorHTML, json: RoveApiWeb.ErrorJSON)
    |> render(:"404")
  end

  # Handle generic errors, specifically missing templates or views
  def call(conn, :error) do
    conn
    |> put_status(:internal_server_error)
    |> put_view(json: RoveApiWeb.ErrorJSON) # Ensure this is the correct module reference
    |> render("error.json", message: "An unexpected error occurred.")
  end

  # Catch-all for any other errors not explicitly handled above
  def call(conn, _unhandled_error) do
    conn
    |> put_status(:internal_server_error)
    |> put_view(json: RoveApiWeb.ErrorJSON) # Correct module reference
    |> render("error.json", message: "An unexpected error occurred.")
  end
end

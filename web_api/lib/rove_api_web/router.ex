defmodule RoveApiWeb.Router do
  use RoveApiWeb, :router
  use Plug.ErrorHandler

  # These need to be handled with the Plug.ErrorHandler abvoe
  defp handle_errors(conn, %{reason: %Phoenix.Router.NoRouteError{message: message}}) do
    conn
    |> json(%{errors: message})
    |> halt()
  end

  defp handle_errors(conn, %{reason: %{message: message}}) do
    conn
    |> json(%{errors: message})
    |> halt()
  end

  defp handle_errors(conn, body) do
    IO.inspect(body)

    conn
    |> json(%{errors: "request failed see logs"})
    |> halt()
  end

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, html: {RoveApiWeb.Layouts, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug :fetch_session
    plug CORSPlug, origin: "*"
  end

  pipeline :auth do
    plug RoveApiWeb.Auth.Pipeline
    plug RoveApiWeb.Auth.SetAccount
  end

  scope "/", RoveApiWeb do
    pipe_through :browser
    get "/", PageController, :home
  end

  scope "/api", RoveApiWeb do
    pipe_through :api

    get "/events", EventController, :index
    get "/events/:id", EventController, :show
    post "/events", EventController, :create


    post "/accounts/create", AccountController, :create
    post "/accounts/sign-in", AccountController, :sign_in
  end

  scope "/api", RoveApiWeb do
    pipe_through [:api, :auth]

    get "/accounts/get-by-id/:id", AccountController, :show
    get "/accounts", AccountController, :index
    put "/accounts", AccountController, :update
    # We add the sign-out endpoint here because only accounts that are
    # authenticated, should be able to sign out
    get "/accounts/sign-out", AccountController, :sign_out
    get "/accounts/refresh-session", AccountController, :refresh_session

    put "/users/update", UserController, :update
    get "/users/get-by-id/:id", UserController, :show
  end

  # Other scopes may use custom stacks.
  # scope "/api", RoveApiWeb do
  #   pipe_through :api
  # end

  # Enable LiveDashboard and Swoosh mailbox preview in development
  if Application.compile_env(:rove_api, :dev_routes) do
    # If you want to use the LiveDashboard in production, you should put
    # it behind authentication and allow only admins to access it.
    # If your application does not have an admins-only section yet,
    # you can use Plug.BasicAuth to set up some basic authentication
    # as long as you are also using SSL (which you should anyway).
    import Phoenix.LiveDashboard.Router

    scope "/dev" do
      pipe_through :browser

      live_dashboard "/dashboard", metrics: RoveApiWeb.Telemetry
      forward "/mailbox", Plug.Swoosh.MailboxPreview
    end
  end
end

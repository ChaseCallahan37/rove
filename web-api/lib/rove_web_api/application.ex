defmodule RoveWebApi.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      RoveWebApiWeb.Telemetry,
      RoveWebApi.Repo,
      {DNSCluster, query: Application.get_env(:rove_web_api, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: RoveWebApi.PubSub},
      # Start the Finch HTTP client for sending emails
      {Finch, name: RoveWebApi.Finch},
      # Start a worker by calling: RoveWebApi.Worker.start_link(arg)
      # {RoveWebApi.Worker, arg},
      # Start to serve requests, typically the last entry
      RoveWebApiWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: RoveWebApi.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    RoveWebApiWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end

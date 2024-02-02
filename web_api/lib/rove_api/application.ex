defmodule RoveApi.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      RoveApiWeb.Telemetry,
      RoveApi.Repo,
      {DNSCluster, query: Application.get_env(:rove_api, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: RoveApi.PubSub},
      # Start the Finch HTTP client for sending emails
      {Finch, name: RoveApi.Finch},
      # Start a worker by calling: RoveApi.Worker.start_link(arg)
      # {RoveApi.Worker, arg},
      # Start to serve requests, typically the last entry
      RoveApiWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: RoveApi.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    RoveApiWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end

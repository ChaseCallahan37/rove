defmodule RoveApi.Repo.Migrations.AlterEventsForGeolocation do
  use Ecto.Migration

  def change do
    execute "CREATE EXTENSION IF NOT EXISTS postgis;"
    alter table(:events) do
      remove :latitude
      remove :longitude

      add :location, :geometry, null: false
    end
  end
end

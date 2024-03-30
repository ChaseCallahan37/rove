defmodule RoveApi.Repo.Migrations.AlterEventsForGeolocation do
  use Ecto.Migration

  def change do
    alter table(:events) do
      remove :latitude
      remove :longitude

      add :location, :geometry
    end
  end
end

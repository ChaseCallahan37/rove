defmodule RoveApi.Repo.Migrations.AddingTimestampsToTags do
  use Ecto.Migration

  def change do
    alter table(:tags) do
      timestamps(type: :utc_datetime)
    end

    alter table(:event_tags) do
      timestamps(type: :utc_datetime)
    end

    alter table(:user_tags) do
      timestamps(type: :utc_datetime)
    end
  end
end

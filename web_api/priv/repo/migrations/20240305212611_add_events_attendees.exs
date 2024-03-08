defmodule RoveApi.Repo.Migrations.AddEventsAttendees do
  use Ecto.Migration

  def change do
    create table(:event_attendances, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :attendee_id, references(:users, on_delete: :delete_all, type: :binary_id), null: false
      add :event_id, references(:events, on_delete: :delete_all, type: :binary_id), null: false

      timestamps(type: :utc_datetime)
    end

    create index(:event_attendances, [:attendee_id])
    create index(:event_attendances, [:event_id])
    create unique_index(:event_attendances, [:attendee_id, :event_id], name: :unique_event_attendance)
  end
end

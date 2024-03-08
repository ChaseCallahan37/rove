defmodule RoveApi.Repo.Migrations.AddUserRefToEvents do
  use Ecto.Migration

  def change do
    alter table(:events) do
      add :owner_id, references(:users, column: :id, on_delete: :delete_all, type: :binary_id),
        null: false
    end

    create unique_index(:events, [:date, :title, :owner_id], name: :unique_date_title_owner)
  end
end

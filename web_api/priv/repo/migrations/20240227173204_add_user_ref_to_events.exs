defmodule RoveApi.Repo.Migrations.AddUserRefToEvents do
  use Ecto.Migration

  def change do
    alter table(:events) do
      add :user_id, references(:users, on_delete: :delete_all, type: :binary_id), null: false
    end

  end
end

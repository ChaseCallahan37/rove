defmodule RoveApi.Repo.Migrations.CreateUser do
  use Ecto.Migration

  def change do
    create table(:users, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :user_name, :string

      add :account_id,
          references(:accounts, column: :id, on_delete: :delete_all, type: :binary_id)

      timestamps(type: :utc_datetime)
    end

    create index(:users, [:account_id, :user_name])

    create unique_index(:users, [:user_name])
  end
end

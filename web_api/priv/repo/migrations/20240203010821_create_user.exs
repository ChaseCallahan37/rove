defmodule RoveApi.Repo.Migrations.CreateUser do
  use Ecto.Migration

  def change do
    create table(:user) do
      add :user_name, :string
      add :account_id, references(:accounts, on_delete: :nothing)

      timestamps(type: :utc_datetime)
    end

    create index(:user, [:account_id])
  end
end

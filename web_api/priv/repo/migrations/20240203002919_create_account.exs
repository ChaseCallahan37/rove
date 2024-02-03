defmodule RoveApi.Repo.Migrations.CreateAccount do
  use Ecto.Migration

  def change do
    create table(:account) do
      add :email, :string
      add :hash_password, :string

      timestamps(type: :utc_datetime)
    end
  end
end

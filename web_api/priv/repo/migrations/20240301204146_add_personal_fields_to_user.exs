defmodule RoveApi.Repo.Migrations.AddPersonalFieldsToUser do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :dob, :date
      add :gender, :string
      add :first_name, :string
      add :last_name, :string
    end
  end
end

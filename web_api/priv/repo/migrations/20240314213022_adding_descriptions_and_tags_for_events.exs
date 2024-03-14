defmodule RoveApi.Repo.Migrations.AddingDescriptionsAndTagsForEvents do
  use Ecto.Migration

  def change do
    create table(:tags, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :name, :string, null: false
    end

    create unique_index(:tags, [:name], name: :unique_tag_name)

    create table(:event_tags, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :event_id, references(:events, on_delete: :delete_all, type: :binary_id), null: false
      add :tag_id, references(:tags, on_delete: :delete_all, type: :binary_id), null: false
    end

    create unique_index(:event_tags, [:event_id, :tag_id], name: :unique_event_tags)

    create table(:user_tags, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :user_id, references(:users, on_delete: :delete_all, type: :binary_id), null: false
      add :tag_id, references(:tags, on_delete: :delete_all, type: :binary_id), null: false
    end

    create unique_index(:user_tags, [:user_id, :tag_id], name: :unique_user_tags)

    alter table(:events) do
      add :description, :string
    end




  end
end

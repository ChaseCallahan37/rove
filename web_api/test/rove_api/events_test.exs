# defmodule RoveApi.EventsTest do
#   use RoveApi.DataCase

#   alias RoveApi.Events

#   describe "events" do
#     alias RoveApi.Events.Event

#     import RoveApi.EventsFixtures

#     @invalid_attrs %{date: nil, title: nil, latitude: nil, longitude: nil}

#     test "list_events/0 returns all events" do
#       event = event_fixture()
#       assert Events.list_events() == [event]
#     end

#     test "get_event!/1 returns the event with given id" do
#       event = event_fixture()
#       assert Events.get_event!(event.id) == event
#     end

#     test "create_event/1 with valid data creates a event" do
#       valid_attrs = %{
#         date: ~D[2024-02-02],
#         title: "some title",
#         latitude: 120.5,
#         longitude: 120.5
#       }

#       assert {:ok, %Event{} = event} = Events.create_event(valid_attrs)
#       assert event.date == ~D[2024-02-02]
#       assert event.title == "some title"
#       assert event.latitude == 120.5
#       assert event.longitude == 120.5
#     end

#     test "create_event/1 with invalid data returns error changeset" do
#       assert {:error, %Ecto.Changeset{}} = Events.create_event(@invalid_attrs)
#     end

#     test "update_event/2 with valid data updates the event" do
#       event = event_fixture()

#       update_attrs = %{
#         date: ~D[2024-02-03],
#         title: "some updated title",
#         latitude: 456.7,
#         longitude: 456.7
#       }

#       assert {:ok, %Event{} = event} = Events.update_event(event, update_attrs)
#       assert event.date == ~D[2024-02-03]
#       assert event.title == "some updated title"
#       assert event.latitude == 456.7
#       assert event.longitude == 456.7
#     end

#     test "update_event/2 with invalid data returns error changeset" do
#       event = event_fixture()
#       assert {:error, %Ecto.Changeset{}} = Events.update_event(event, @invalid_attrs)
#       assert event == Events.get_event!(event.id)
#     end

#     test "delete_event/1 deletes the event" do
#       event = event_fixture()
#       assert {:ok, %Event{}} = Events.delete_event(event)
#       assert_raise Ecto.NoResultsError, fn -> Events.get_event!(event.id) end
#     end

#     test "change_event/1 returns a event changeset" do
#       event = event_fixture()
#       assert %Ecto.Changeset{} = Events.change_event(event)
#     end
#   end
# end

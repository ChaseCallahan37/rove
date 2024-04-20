# defmodule RoveApiWeb.AccountControllerTest do
#   use RoveApiWeb.ConnCase

#   import RoveApi.AccountsFixtures

#   alias RoveApi.Accounts.Account

#   @create_attrs %{
#     email: "some email",
#     hash_password: "some hash_password"
#   }
#   @update_attrs %{
#     email: "some updated email",
#     hash_password: "some updated hash_password"
#   }
#   @invalid_attrs %{email: nil, hash_password: nil}

#   setup %{conn: conn} do
#     {:ok, conn: put_req_header(conn, "accept", "application/json")}
#   end

#   describe "create account" do
#     test "renders account when data is valid", %{conn: conn} do
#       conn = post(conn, ~p"/api/account", account: @create_attrs)
#       assert %{"id" => id} = json_response(conn, 201)["data"]

#       conn = get(conn, ~p"/api/account/#{id}")

#       assert %{
#                "id" => ^id,
#                "email" => "some email",
#                "hash_password" => "some hash_password"
#              } = json_response(conn, 200)["data"]
#     end

#     test "renders errors when data is invalid", %{conn: conn} do
#       conn = post(conn, ~p"/api/account", account: @invalid_attrs)
#       assert json_response(conn, 422)["errors"] != %{}
#     end
#   end

#   describe "update account" do
#     setup [:create_account]

#     test "renders account when data is valid", %{conn: conn, account: %Account{id: id} = account} do
#       conn = put(conn, ~p"/api/account/#{account}", account: @update_attrs)
#       assert %{"id" => ^id} = json_response(conn, 200)["data"]

#       conn = get(conn, ~p"/api/account/#{id}")

#       assert %{
#                "id" => ^id,
#                "email" => "some updated email",
#                "hash_password" => "some updated hash_password"
#              } = json_response(conn, 200)["data"]
#     end

#     test "renders errors when data is invalid", %{conn: conn, account: account} do
#       conn = put(conn, ~p"/api/account/#{account}", account: @invalid_attrs)
#       assert json_response(conn, 422)["errors"] != %{}
#     end
#   end

#   describe "delete account" do
#     setup [:create_account]

#     test "deletes chosen account", %{conn: conn, account: account} do
#       conn = delete(conn, ~p"/api/account/#{account}")
#       assert response(conn, 204)

#       assert_error_sent 404, fn ->
#         get(conn, ~p"/api/account/#{account}")
#       end
#     end
#   end

#   defp create_account(_) do
#     account = account_fixture()
#     %{account: account}
#   end
# end

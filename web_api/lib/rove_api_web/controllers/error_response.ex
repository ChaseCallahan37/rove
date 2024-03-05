defmodule RoveApiWeb.Controllers.ErrorResponse.NotFound do
  defexception message: "Resource not found", plug_status: 404
end

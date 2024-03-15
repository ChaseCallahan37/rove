defmodule RoveApiWeb.ErrorJSON do
  # If you want to customize a particular status code,
  # you may add your own clauses, such as:
  #
  # def render("500.json", _assigns) do
  #   %{errors: %{detail: "Internal Server Error"}}
  # end

  # By default, Phoenix returns the status message from
  # the template name. For example, "404.json" becomes

  def render("500.json", _assigns) do
    %{
      errors: %{
        detail: "Internal Server Error",
        status: 500,
        title: "Internal Server Error"
      }
    }
  end

  # Handle 404 Not Found specifically
  def render("404.json", _assigns) do
    %{
      errors: %{
        detail: "Not Found",
        status: 404,
        title: "Resource Not Found"
      }
    }
  end

  # Generic error handler, for unexpected errors
  def render("error.json", assigns) do
    message = Map.get(assigns, :message, "An unexpected error occurred.")

    %{
      errors: %{
        detail: message,
        status: 500,
        title: "Unexpected Error"
      }
    }
  end

  # Fallback rendering for any other specific status codes not explicitly handled above
  def render(template, _assigns) do
    status_message = Phoenix.Controller.status_message_from_template(template)
    status_code = Phoenix.Controller.status_code_from_template(template)

    %{
      errors: %{
        detail: status_message || "Error",
        status: status_code || 500,
        title: status_message || "Error"
      }
    }
  end
end

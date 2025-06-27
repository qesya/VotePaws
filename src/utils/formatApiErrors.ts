export function formatApiErrors(error: any): string {
  const defaultMessage =
    error?.response?.data?.message ?? error?.message ?? "Something went wrong";

  const errors = error?.response?.data?.errors;

  if (!errors || typeof errors !== "object") {
    return defaultMessage;
  }

  const fieldMessages = Object.entries(errors)
    .map(([fieldPath, messages]) => {
      const readableField = fieldPath
        .split(".")
        .map((part) => capitalize(part.replace(/_/g, " ")))
        .join(" > ");

      return `• ${readableField}:\n  ${Array.isArray(messages) ? messages.join("\n  ") : messages}`;
    })
    .join("\n\n");

  return `${defaultMessage}\n\n${fieldMessages}`;
}

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

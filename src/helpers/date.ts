export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return `${formattedDate} ${formattedTime}`;
}

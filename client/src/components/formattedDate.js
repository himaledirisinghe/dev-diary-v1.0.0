export default function FormattedDate(inputDate) {
  const dateObject = new Date(inputDate);

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  let formattedDate = new Intl.DateTimeFormat("ko-KR", options)
    .format(dateObject)
    .replace(/\. /g, ".")
    .replace(/\.(?=\s)/g, "")
    .replace(/\.(?=\d{2}:\d{2}:\d{2})/, " ");

  return formattedDate;
}

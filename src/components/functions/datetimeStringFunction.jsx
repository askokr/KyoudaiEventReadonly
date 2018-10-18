import Months from "./months";

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
function datetimeStringFunction(eventDate) {
  const rawDate = new Date(eventDate);
  const days = [
    "Pühapäev",
    "Esmaspäev",
    "Teisipäev",
    "Kolmapäev",
    "Neljapäev",
    "Reede",
    "Laupäev"
  ];
  const message = ["kell"];
  const dateString =
    days[rawDate.getDay()] +
    ", " +
    rawDate.getDate() +
    ". " +
    Months[rawDate.getMonth()] +
    " " +
    rawDate.getFullYear() +
    " " +
    "  " +
    message[0] +
    " " +
    addZero(rawDate.getHours()) +
    ":" +
    addZero(rawDate.getMinutes());

  return dateString;
}

export default datetimeStringFunction;

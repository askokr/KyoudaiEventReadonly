import React from "react";

function timerFunction(props) {
  const event = new Date(props.event.eventDate);
  const time = new Date(props.time);

  const eventHasPassed = event - time <= 0;

  let {
    timeToEvent,
    daysToEvent,
    hoursToEvent,
    minutesToEvent,
    secondsToEvent,
    daysToEventLeftoverInMs,
    hoursToEventLeftoverInMs,
    minutesToEventLeftoverInMs,
    moreThanAnHourLeft
  } = 0;

  if (isNaN(event) || event === "") {
    return "";
  }

  if (!eventHasPassed) {
    const msInDay = 8.64e7;
    const msInHour = 3.6e6;
    const msInMinute = 60000;
    const msInSecond = 1000;

    timeToEvent = event - time;
    daysToEvent = Math.floor(timeToEvent / msInDay);
    daysToEventLeftoverInMs = timeToEvent - daysToEvent * msInDay;
    hoursToEvent = Math.floor(daysToEventLeftoverInMs / msInHour);
    hoursToEventLeftoverInMs =
      daysToEventLeftoverInMs - hoursToEvent * msInHour;
    minutesToEvent = Math.floor(hoursToEventLeftoverInMs / msInMinute);
    minutesToEventLeftoverInMs =
      hoursToEventLeftoverInMs - minutesToEvent * msInMinute;
    secondsToEvent = Math.floor(minutesToEventLeftoverInMs / msInSecond);
    moreThanAnHourLeft = timeToEvent > msInHour;
  }
  const message = [
    "päev",
    "a",
    "tund",
    "i",
    "minut",
    "it",
    "",
    "ja",
    "sekund",
    "it",
    "Sündmus on möödunud."
  ];

  if (!eventHasPassed) {
    return (
      <React.Fragment>
        {daysToEvent > 0
          ? daysToEvent +
            " " +
            message[0] +
            (daysToEvent !== 1 ? message[1] : "") +
            ", "
          : ""}
        {hoursToEvent > 0
          ? hoursToEvent +
            " " +
            message[2] +
            (hoursToEvent !== 1 ? message[3] : "") +
            ", "
          : ""}
        {minutesToEvent > 0
          ? minutesToEvent +
            " " +
            message[4] +
            (minutesToEvent !== 1 ? message[5] : "") +
            (moreThanAnHourLeft ? message[6] : "") +
            "  " +
            message[7]
          : ""}{" "}
        {secondsToEvent}{" "}
        {" " + message[8] + (secondsToEvent !== 1 ? message[9] : "") + "."}
      </React.Fragment>
    );
  } else {
    return message[10];
  }
}

export default timerFunction;

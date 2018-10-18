import React from "react";
import TimerDisplay from "./timerdisplay";

const TimerList = ({ events, time }) => {
  const eventsToRender = events.slice(1);

  return (
    <React.Fragment>
      {eventsToRender.map(event => {
        return <TimerDisplay event={event} time={time} key={event.eventId} />;
      })}
      <div className="container m-4 bottom-filler" />
    </React.Fragment>
  );
};

export default TimerList;

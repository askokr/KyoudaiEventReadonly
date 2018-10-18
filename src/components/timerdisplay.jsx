import React, { Component } from "react";
import Buttons from "./TimerDisplayElements/buttons";
import TextBox from "./TimerDisplayElements/textBox";
import "../App.css";

class TimerDisplay extends Component {
  render() {
    const props = this.props;
    const {
      event,
      favouriteEvent,
      onDelete,
      onEdit,
      onFavourite,
      time
    } = props;
    const { eventName, eventDate, eventId, imageUrl } = event;
    const backgroundImage = {
      backgroundImage: `url(${imageUrl})`
    };
    return (
      <div className="container timer-container text-center m-4 zoom">
        <div style={backgroundImage} className="background-image" />
        <div
          className={
            "text-container" +
            (new Date(time) > new Date(eventDate) ? " passedEvent" : "")
          }
        >
          <div className="d-flex flex-row">
            <div className="p-2 w-100">
              <TextBox
                eventName={eventName}
                eventDate={eventDate}
                timerFunctionInput={props}
              />
            </div>
            <div className="p-2">
              <Buttons
                eventId={eventId}
                favouriteEvent={favouriteEvent}
                onDelete={onDelete}
                onEdit={onEdit}
                onFavourite={onFavourite}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TimerDisplay;

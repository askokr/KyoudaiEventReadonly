import React, { Component } from "react";
import TextBox from "./TimerDisplayElements/textBox";
import "../App.css";

class TimerDisplay extends Component {
  render() {
    const props = this.props;
    const { event, time } = props;
    const { eventName, eventDate, imageUrl } = event;
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
          <div className="d-flex justify-content-center">
            <div className="p-2 justify-content-center">
              <TextBox
                eventName={eventName}
                eventDate={eventDate}
                timerFunctionInput={props}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TimerDisplay;

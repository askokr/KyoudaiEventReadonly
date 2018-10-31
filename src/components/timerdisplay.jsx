import React, { Component } from "react";
import MediaQuery from "react-responsive";
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
    const backgroundImageMob = {
      backgroundImage: `url(${imageUrl})`,
      height: "450px"
    };
    return (
      <React.Fragment>
        <MediaQuery minDeviceWidth={800}>
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
        </MediaQuery>
        <MediaQuery maxDeviceWidth={800}>
          <div className="container timer-container-mob text-center m-4 zoom">
            <div style={backgroundImageMob} className="background-image" />
            <div
              className={
                "text-container-mob" +
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
        </MediaQuery>
      </React.Fragment>
    );
  }
}

export default TimerDisplay;

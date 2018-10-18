import React, { Component } from "react";
import timerFunction from "../functions/timerfunction";
import datetimeStringFunction from "../functions/datetimeStringFunction";

class TextBox extends Component {
  render() {
    const { eventDate, eventName, timerFunctionInput } = this.props;
    const message = ["Nimeta sündmus", "Määramata ajal"];
    return (
      <React.Fragment>
        <h2>{eventName === "" ? message[0] : eventName}</h2>
        <h4>
          {Object.prototype.toString.call(eventDate) === "[object Date]" ||
          eventDate === ""
            ? message[1]
            : datetimeStringFunction(eventDate)}
        </h4>
        <h3>{timerFunction(timerFunctionInput)}</h3>
      </React.Fragment>
    );
  }
}

export default TextBox;

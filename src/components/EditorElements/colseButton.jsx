import React, { Component } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";

class CloseButton extends Component {
  render() {
    return this.closeButton();
  }

  closeButton = () => {
    const { whatEventAreYouEditing, onToggle } = this.props;
    const message = [
      "Sule",
      "Sule",
      "Tühista sündmuse lisamine",
      "Tühista sündmuse muutmine"
    ];
    if (whatEventAreYouEditing === null) {
      return (
        <Tooltip TransitionComponent={Zoom} placement="top" title={message[2]}>
          <button
            onClick={() => onToggle("editor")}
            className="btn btn-danger m-4 btn-lg"
          >
            {message[0]}
          </button>
        </Tooltip>
      );
    } else {
      return (
        <Tooltip TransitionComponent={Zoom} placement="top" title={message[3]}>
          <button
            onClick={() => onToggle("event")}
            className="btn btn-danger m-4 btn-lg"
          >
            {message[1]}
          </button>
        </Tooltip>
      );
    }
  };
}

export default CloseButton;

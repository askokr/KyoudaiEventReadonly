import React, { Component } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";

class EditButton extends Component {
  render() {
    return this.editButton();
  }
  editButton = () => {
    const { onFormSubmit, whatEventAreYouEditing } = this.props;
    const message = [
      "LIsa uus sündmus",
      "Kinnita muutused",
      "Lisa sündmus",
      "Kinnita muutused"
    ];
    if (whatEventAreYouEditing === null) {
      return (
        <Tooltip TransitionComponent={Zoom} placement="top" title={message[2]}>
          <button onClick={onFormSubmit} className="btn btn-warning m-4 btn-lg">
            {message[0]}
          </button>
        </Tooltip>
      );
    } else {
      return (
        <Tooltip TransitionComponent={Zoom} placement="top" title={message[3]}>
          <button onClick={onFormSubmit} className="btn btn-warning m-4 btn-lg">
            {message[1]}
          </button>
        </Tooltip>
      );
    }
  };
}

export default EditButton;

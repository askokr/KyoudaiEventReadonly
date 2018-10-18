import React, { Component } from "react";
import Editor from "./editor";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
const message = ["Lisa uus sündmus", "Lisa sündmus"];

class AddEvent extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.areYouAddingAnEvent ? (
          <Editor
            areYouAddingAnEvent={this.props.areYouAddingAnEvent}
            editableEvent={this.props.editableEvent}
            oldImageUrl={this.props.oldImageUrl}
            onEventDate={this.props.onEventDate}
            onEventName={this.props.onEventName}
            onImageUrl={this.props.onImageUrl}
            onFormSubmit={this.props.onFormSubmit}
            onToggle={this.props.onToggle}
            onRandomImage={this.props.onRandomImage}
            whatEventAreYouEditing={this.props.whatEventAreYouEditing}
          />
        ) : (
          <React.Fragment>{this.dafaultView()}</React.Fragment>
        )}
      </React.Fragment>
    );
  }

  dafaultView() {
    return (
      <div className="container timer-container text-center m-4">
        <Tooltip TransitionComponent={Zoom} placement="top" title={message[0]}>
          <button
            className="container text-cente btn btn-warning shadowy"
            onClick={() => this.props.onToggle("editor")}
          >
            <h2>{message[1]}</h2>
          </button>
        </Tooltip>
      </div>
    );
  }
}

export default AddEvent;

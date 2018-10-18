import React, { Component } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";

class SaveLoadButtonGruop extends Component {
  render() {
    const { onWriteCookie, onReadCookie, isThereACookie } = this.props;
    const message = ["Salvesta", "Lae", "Salvesta küpsisena", "Lae küpsisest"];
    return (
      <div className="btn-group btn-group-toggle m-2" data-toggle="buttons">
        <Tooltip TransitionComponent={Zoom} title={message[2]}>
          <button
            className="btn btn-outline-success btn-lg"
            onClick={onWriteCookie}
          >
            {message[0]}
          </button>
        </Tooltip>
        <Tooltip TransitionComponent={Zoom} title={message[3]}>
          <button
            className={
              "btn btn-lg btn-" + (isThereACookie ? "" : "outline-") + "success"
            }
            onClick={onReadCookie}
          >
            {message[1]}
          </button>
        </Tooltip>
      </div>
    );
  }
}

export default SaveLoadButtonGruop;

import React, { Component } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";

class SaveLoadButtonGruop extends Component {
  render() {
    const { onLoad } = this.props;
    const message = ["Värskenda", "Värskenda nimekirja"];
    return (
      <div className="btn-group btn-group-toggle m-2" data-toggle="buttons">
        <Tooltip TransitionComponent={Zoom} title={message[1]}>
          <button className={"btn btn-lg btn-outline-success"} onClick={onLoad}>
            {message[0]}
          </button>
        </Tooltip>
      </div>
    );
  }
}

export default SaveLoadButtonGruop;

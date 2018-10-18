import React, { Component } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import Octicon from "react-octicon";

class SortOrderButtonGroup extends Component {
  render() {
    const { onSort, sortDirection } = this.props;
    const message = [
      "Sorteeri laskuvalt",
      "Sorteeri lisamise järjekorras",
      "Sorteeri tõusvalt"
    ];
    return (
      <div className="btn-group btn-group-toggle m-2" data-toggle="buttons">
        <Tooltip TransitionComponent={Zoom} title={message[0]}>
          <button
            className={
              "btn btn-lg btn-" +
              (sortDirection === "ascending" ? "" : "outline-") +
              "primary"
            }
            onClick={() => onSort("ascending")}
          >
            <Octicon name="chevron-up" />
          </button>
        </Tooltip>
        <Tooltip TransitionComponent={Zoom} title={message[1]}>
          <button
            className={
              "btn btn-lg btn-" +
              (sortDirection === "byKey" ? "" : "outline-") +
              "primary"
            }
            onClick={() => onSort("byKey")}
          >
            <Octicon name="pencil" />
          </button>
        </Tooltip>
        <Tooltip TransitionComponent={Zoom} title={message[2]}>
          <button
            className={
              "btn btn-lg btn-" +
              (sortDirection === "descending" ? "" : "outline-") +
              "primary"
            }
            onClick={() => onSort("descending")}
          >
            <Octicon name="chevron-down" />
          </button>
        </Tooltip>
      </div>
    );
  }
}

export default SortOrderButtonGroup;

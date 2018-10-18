import React, { Component } from "react";
import Moment from "moment";
import DateTime from "react-datetime";
import Octicon from "react-octicon";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";

Moment.locale("en-gb", {
  week: {
    dow: 1 // Monday is the first day of the week.
  }
});

class Form extends Component {
  render() {
    const {
      eventName,
      eventDate,
      imageUrl,
      onFormSubmit,
      onEventName,
      onEventDate,
      onImageUrl,
      onRandomImage
    } = this.props;
    const message = [
      "Sündmuse nimi",
      "Võta Unsplashist juhuslik pilt",
      "Link pildi juurde"
    ];
    return (
      <form className="container-fluid" onSubmit={onFormSubmit}>
        <div className="form-row">
          <div className="col">
            <div className="input-group mb-3 m-2">
              <div className="input-group-prepend">
                <span className="input-group-text">Event name:</span>
              </div>
              <input
                id={eventName}
                className="form-control"
                name={eventName}
                type="text"
                value={eventName}
                maxLength="42"
                onChange={onEventName}
                placeholder={message[0]}
              />
            </div>
          </div>

          <div className="col">
            <div className="input-group mb-3 m-2">
              <div className="input-group-prepend">
                <span className="input-group-text">Event date:</span>
              </div>
              <DateTime
                value={eventDate}
                inputProps={{ readOnly: true }}
                onChange={onEventDate}
              />
            </div>
          </div>
        </div>
        <div className="form-row">
          <div className="input-group mb-3 m-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Image URL:</span>
            </div>
            <input
              type="url"
              className="form-control"
              placeholder={message[2]}
              value={imageUrl}
              name="imageUrl"
              onChange={onImageUrl}
            />
            <div className="input-group-append">
              <Tooltip
                TransitionComponent={Zoom}
                placement="bottom-end"
                title={message[1]}
              >
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onRandomImage}
                >
                  <Octicon name="unverified" />
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default Form;

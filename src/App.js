import React, { Component } from "react";
import TimerList from "./components/timerlist";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

class App extends Component {
  state = {
    favouriteEvent: null,
    sortDirection: "byKey",
    time: new Date(),
    whatEvetsToDisplay: "all",
    events: [
      {
        eventId: 0,
        eventName: "",
        eventDate: "",
        imageUrl: ""
      }
    ]
  };

  componentDidMount() {
    setInterval(this.update, 1000);
    this.handleSheetRead();
  }

  update = () => {
    this.setState({
      time: new Date()
    });
    this.rememberSortorder();
  };
  //Sort images to be displayed
  displayedEvents = () => {
    let usnortedEvents = [...this.state.events];
    const currentTime = this.state.time;
    const theZeroeth = usnortedEvents.shift();
    const favouriteEventId = this.state.favouriteEvent;
    let events = usnortedEvents;
    let favouriteEvent, sortedEvents;

    if (favouriteEventId !== null) {
      favouriteEvent = usnortedEvents.find(e => e.eventId === favouriteEventId);
      events = usnortedEvents.filter(e => e.eventId !== favouriteEventId);
    }
    switch (this.state.whatEvetsToDisplay) {
      case "upcoming":
        sortedEvents = events.filter(
          e => new Date(e.eventDate) > new Date(currentTime)
        );
        break;
      case "passed":
        sortedEvents = events.filter(
          e => new Date(e.eventDate) < new Date(currentTime)
        );
        break;
      default:
        sortedEvents = events;
    }
    if (favouriteEventId !== null) {
      sortedEvents.unshift(favouriteEvent);
    }
    sortedEvents.unshift(theZeroeth);
    return sortedEvents;
  };

  rememberSortorder = () => {
    switch (this.state.sortDirection) {
      case "descending":
        this.handleSort("descending");
        break;
      case "ascending":
        this.handleSort("ascending");
        break;
      default:
        this.handleSort("byKey");
    }
  };

  handleDisplay = type => {
    const whatEvetsToDisplay = type;
    this.setState({ whatEvetsToDisplay });
  };

  handleSheetRead = async () => {
    const api_call = await fetch(
      "https://sheetsu.com/apis/v1.0qu/6d94d7456f46"
    );
    const api_response = await api_call.json();

    let events = [...this.state.events];

    const experiment = api_response;
    const nrOfEvents = experiment.length;

    for (let i = 0; i < nrOfEvents; i++) {
      let eventId = api_response[i].eventId;
      let eventName = api_response[i].eventName;
      let eventDate = api_response[i].eventDate;
      let imageUrl = api_response[i].imageUrl;
      let event = {
        eventId: eventId,
        eventName: eventName,
        eventDate: eventDate,
        imageUrl: imageUrl
      };
      events.push(event);
    }
    this.setState({ events });
  };

  handleSort = type => {
    let usnortedEvents = [...this.state.events];
    const theZeroeth = usnortedEvents.shift();
    const favouriteEventId = this.state.favouriteEvent;
    let events, favouriteEvent, sortedEvents, sortDirection;

    if (favouriteEventId !== null) {
      favouriteEvent = usnortedEvents.find(e => e.eventId === favouriteEventId);
      events = usnortedEvents.filter(e => e.eventId !== favouriteEventId);
    } else {
      events = usnortedEvents;
    }
    switch (type) {
      case "ascending":
        usnortedEvents.sort(
          (a, b) => new Date(b.eventDate) - new Date(a.eventDate)
        );
        break;
      case "descending":
        usnortedEvents.sort(
          (a, b) => new Date(a.eventDate) - new Date(b.eventDate)
        );
        break;
      default:
        usnortedEvents.sort((a, b) => a.eventId - b.eventId);
        break;
    }
    sortedEvents = usnortedEvents;
    if (favouriteEventId !== null) {
      sortedEvents.unshift(favouriteEvent);
    }
    sortedEvents.unshift(theZeroeth);
    events = sortedEvents;
    this.setState({ events });
    sortDirection = type;
    this.setState({ sortDirection });
  };

  render() {
    document.body.style.backgroundColor = "#fff6f3";

    const message = ["Sündmused", "Eelseisvad ja möödunud sündmused"];
    return (
      <React.Fragment>
        <NavBar
          onDisplay={this.handleDisplay}
          onLoad={this.handleSheetRead}
          onSort={this.handleSort}
          sortDirection={this.state.sortDirection}
          time={this.state.time}
          whatEvetsToDisplay={this.state.whatEvetsToDisplay}
        />
        <main>
          <div className="jumbotron jumbotron-fluid">
            <div className="container">
              <h1 className="display-1">{message[0]}</h1>
              <p className="lead">{message[1]}</p>
            </div>
          </div>

          <TimerList
            events={this.displayedEvents(this.state.events)}
            time={this.state.time}
          />
        </main>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;

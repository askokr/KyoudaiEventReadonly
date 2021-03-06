import React, { Component } from "react";
import MediaQuery from "react-responsive";
import TimerList from "./components/timerlist";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

class App extends Component {
  state = {
    resort: false,
    favouriteEvent: null,
    sortDirection: "byKey",
    time: new Date(),
    whatEvetsToDisplay: "all",
    events: [{}]
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
    const API_ROUTE = "https://sheets.googleapis.com/v4/spreadsheets/";
    const FILE_ID = "1Np5G3EEvkKWRxlBu17DGiDj0hY53sMbI7BKqO246irs";
    const REQUEST = "/values/C2?";
    const API_KEY = "AIzaSyCUmw_0VD7EYk2JBh8oeOmN3fRtR2nb1lU";
    const API_CALL_ROUTE = `${API_ROUTE}${FILE_ID}${REQUEST}key=${API_KEY}`;

    const api_call = await fetch(API_CALL_ROUTE);

    const apiCallContents = await api_call.json();
    const values = apiCallContents.values[0];
    const eventsString = values[0];
    let events = JSON.parse(eventsString);
    const dafaultEvent = this.state.events[0];
    events.unshift(dafaultEvent);
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

    // console.log("main component update");

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
              <MediaQuery minDeviceWidth={1224}>
                <h1 className="display-1">{message[0]}</h1>
              </MediaQuery>
              <MediaQuery maxDeviceWidth={1224}>
                <h1 className="display-4">{message[0]}</h1>
              </MediaQuery>
              <p className="lead lead-mob">{message[1]}</p>
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

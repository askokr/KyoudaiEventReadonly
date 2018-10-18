import React, { Component } from "react";
import TimerList from "./components/timerlist";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

class App extends Component {
  state = {
    areYouAddingAnEvent: false,
    favouriteEvent: null,
    oldImageUrl: undefined,
    sortDirection: "byKey",
    time: new Date(),
    whatEventAreYouEditing: null,
    whatEvetsToDisplay: "all",
    events: [
      {
        eventName: "",
        eventDate: "",
        imageUrl: "",
        eventId: 0
      }
    ]
  };

  //the place to create a state, make ajax calls etc
  componentDidMount() {
    setInterval(this.update, 1000);
  }

  update = () => {
    this.setState({
      time: new Date()
    });
    this.rememberSortorder();
    // document.cookie !== ""
    //   ? console.log(document.cooki)
    //   : console.log("no cookie");
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

  handleDelete = eventId => {
    const favouriteEvent = null;
    const events = this.state.events.filter(c => c.eventId !== eventId);
    if (eventId === this.state.favouriteEvent) {
      this.setState({ favouriteEvent });
    }
    this.setState({ events });
  };

  handleDisplay = type => {
    const whatEvetsToDisplay = type;
    this.setState({ whatEvetsToDisplay });
  };

  handleEdit = eventId => {
    let areYouAddingAnEvent = this.state.areYouAddingAnEvent;
    if (areYouAddingAnEvent) {
      areYouAddingAnEvent = false;
      this.setState({ areYouAddingAnEvent });
    }
    const event = this.state.events.find(c => c.eventId === eventId);
    const whatEventAreYouEditing = eventId;
    this.setState({ whatEventAreYouEditing });
    const oldImageUrl = event.imageUrl;
    this.setState({ oldImageUrl });

    const events = [...this.state.events];
    events[0].eventName = event.eventName;
    events[0].eventDate = event.eventDate;
    events[0].imageUrl = event.imageUrl;
  };

  handleEventDate = e => {
    const value = e.valueOf();
    const events = [...this.state.events];
    events[0].eventDate = value;
    this.setState({ events });
  };

  handleEventName = e => {
    const value = e.target.value;
    const events = [...this.state.events];
    events[0].eventName = value;
    this.setState({ events });
  };

  handleOnFavourite = eventId => {
    let favouriteEvent;
    if (eventId !== this.state.favouriteEvent) {
      favouriteEvent = eventId;
    } else {
      favouriteEvent = null;
    }
    this.setState({ favouriteEvent });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const newEventName = this.state.events[0].eventName;
    const newEventDate = this.state.events[0].eventDate;
    const newImageUrl = this.state.events[0].imageUrl;
    let events = [...this.state.events];

    if (this.state.areYouAddingAnEvent === true) {
      const newEventId = this.state.time.getTime();
      const newEvent = {
        eventName: newEventName,
        eventDate: newEventDate,
        imageUrl: newImageUrl,
        eventId: newEventId
      };
      events.push(newEvent);

      const areYouAddingAnEvent = false;
      this.setState({ areYouAddingAnEvent });
    } else {
      let whatEventAreYouEditing = this.state.whatEventAreYouEditing;
      var indexOfEvent = events.findIndex(
        i => i.eventId === whatEventAreYouEditing
      );
      events[indexOfEvent].eventName = newEventName;
      events[indexOfEvent].eventDate = newEventDate;
      events[indexOfEvent].imageUrl = newImageUrl;

      whatEventAreYouEditing = null;
      this.setState({ whatEventAreYouEditing });
      const oldImageUrl = undefined;
      this.setState({ oldImageUrl });
    }
    events[0] = {
      eventName: "",
      eventDate: "",
      imageUrl: "",
      eventId: 0
    };
    this.setState({ events });
  };

  handleImageUrl = e => {
    const value = e.target.value;
    const events = [...this.state.events];
    events[0].imageUrl = value;
    this.setState({ events });
  };

  handleRandomImage = async e => {
    e.preventDefault();
    const ACCESS_KEY =
      "b97cc352335ea33a72e964d4c985c386b54ac45abbb031bbb23ba1c2bca3b116";
    const URI = "https://api.unsplash.com/photos/random/?client_id=";
    const api_call = await fetch(`${URI}${ACCESS_KEY}`);
    const response = await api_call.json();
    const imageUrl = response.urls.regular;
    const userProfile = response.user.links.html;
    console.log(userProfile);
    let events = [...this.state.events];
    events[0].imageUrl = imageUrl;
    this.setState(events);
  };

  handleSheetRead = async () => {
    const API_ROUTE = "https://sheets.googleapis.com/v4/spreadsheets/";
    const FILE_ID = "1syL5nLI6lmz4qoMtshYTdZjx_Q5l75elG9iPtcKKgvk";
    const COMMAND = "/values/B2%3AC2?";
    const API_KEY = "AIzaSyCUmw_0VD7EYk2JBh8oeOmN3fRtR2nb1lU";

    const api_call = await fetch(
      `${API_ROUTE}${FILE_ID}${COMMAND}key=${API_KEY}`
    );
    const apiCallContents = await api_call.json();
    const values = apiCallContents.values[0];
    const eventsString = values[1];
    let events = JSON.parse(eventsString);
    const dafaultEvent = this.state.events[0];
    events.unshift(dafaultEvent);
    this.setState({ events });
  };

  handleWriteCookie = async () => {
    // const API_KEY = "AIzaSyCUmw_0VD7EYk2JBh8oeOmN3fRtR2nb1lU";
    // const API_ROUTE_FOR_CALL =
    //   "https://sheets.googleapis.com/v4/spreadsheets/1syL5nLI6lmz4qoMtshYTdZjx_Q5l75elG9iPtcKKgvk:batchUpdate?key=";
    // const COMMAND =
    //   '{"requests":[{"insertDimension": {"range":{"sheetId":0,"dimension":"ROWS","startIndex": 1,"endIndex": 2},"inheritFromBefore":false}}]}';
    // const ACCESS_TOKEN =
    //   "ya29.Glw2Bi_GNZMsT_hJK0COxpZg3koRwi5ENaCQt-50Hf_HYnpuu3N7AS8b4Ja_f5RwJyIcMo0vHaVhKdYch6y32rlIwd45BJEihUiTmGazlgXF7xSOXCShzaQdM9KUtw";
    // const fetch(`${API_ROUTE_FOR_CALL}${API_KEY}${COMMAND}`, {
    //   method: "POST",
    //   headers: {
    //     "Access-Control-Allow-Origin":
    //       "https://fervent-lumiere-e97c88.netlify.com/",
    //     Authorization: `Bearer ${ACCESS_TOKEN}`,
    //     "Access Token":
    //       "ya29.Glw2Bi_GNZMsT_hJK0COxpZg3koRwi5ENaCQt-50Hf_HYnpuu3N7AS8b4Ja_f5RwJyIcMo0vHaVhKdYch6y32rlIwd45BJEihUiTmGazlgXF7xSOXCShzaQdM9KUtw",
    //     Accept: "application/json",
    //     "Content-Type": "application/json"
    //   }
    // });
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

  handleToggle = what => {
    if (what === "editor") {
      let events = [...this.state.events];
      events[0] = {
        eventName: "",
        eventDate: "",
        imageUrl: "",
        eventId: 0
      };
      this.setState({ events });
      if (this.state.whatEventAreYouEditing !== null) {
        this.handleToggle("event");
      }
      this.setState(prevState => ({
        areYouAddingAnEvent: !prevState.areYouAddingAnEvent
      }));
    } else {
      const whatEventAreYouEditing = null;
      const oldImageUrl = undefined;
      this.setState({ whatEventAreYouEditing });
      this.setState({ oldImageUrl });
    }
  };

  render() {
    document.body.style.backgroundColor = "#fff6f3";

    const message = ["Sündmused", "Eelseisvad ja möödunud sündmused"];
    return (
      <React.Fragment>
        <NavBar
          onDelete={this.handleDelete}
          onDisplay={this.handleDisplay}
          onReadCookie={this.handleSheetRead}
          onSort={this.handleSort}
          onWriteCookie={this.handleWriteCookie}
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
            areYouAddingAnEvent={this.state.areYouAddingAnEvent}
            events={this.displayedEvents(this.state.events)}
            favouriteEvent={this.state.favouriteEvent}
            time={this.state.time}
            oldImageUrl={this.state.oldImageUrl}
            onDelete={this.handleDelete}
            onEdit={this.handleEdit}
            onEventDate={this.handleEventDate}
            onEventName={this.handleEventName}
            onFavourite={this.handleOnFavourite}
            onFormSubmit={this.handleFormSubmit}
            onImageUrl={this.handleImageUrl}
            onRandomImage={this.handleRandomImage}
            onToggle={this.handleToggle}
            whatEventAreYouEditing={this.state.whatEventAreYouEditing}
          />
        </main>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;

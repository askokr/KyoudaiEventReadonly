import React from "react";
import MediaQuery from "react-responsive";
import Clock from "./NavBarElements/clock";
import SaveLoadButtonGruop from "./NavBarElements/saveLoadButtonGroup";
import SortOrderButtonGroup from "./NavBarElements/sortOrderButtonGroup";
import ElementsToDisplayButtonGroup from "./NavBarElements/elementsToDisplayButtonGroup";

const NavBar = ({
  onDisplay,
  onReadCookie,
  onSort,
  onWriteCookie,
  sortDirection,
  time,
  whatEvetsToDisplay
}) => {
  let isThereACookie = document.cookie !== "" ? true : false;
  return (
    <React.Fragment>
      <MediaQuery minDeviceWidth={1224}>
        <nav className="navbar sticky-top navbar-light bg-dark">
          <div className="row">
            {/* <h1 className="text-white m-4">Events</h1> */}

            <SaveLoadButtonGruop
              onReadCookie={onReadCookie}
              onWriteCookie={onWriteCookie}
              isThereACookie={isThereACookie}
            />

            <SortOrderButtonGroup
              onSort={onSort}
              sortDirection={sortDirection}
            />

            <ElementsToDisplayButtonGroup
              onDisplay={onDisplay}
              whatEvetsToDisplay={whatEvetsToDisplay}
            />
          </div>
          <Clock time={time} />
        </nav>
      </MediaQuery>
      <MediaQuery maxDeviceWidth={1224}>
        <nav className="navbar navbar-light bg-dark">
          <div className="row">
            {/* <h1 className="text-white m-4">Events</h1> */}

            <SaveLoadButtonGruop
              onReadCookie={onReadCookie}
              onWriteCookie={onWriteCookie}
              isThereACookie={isThereACookie}
            />

            <SortOrderButtonGroup
              onSort={onSort}
              sortDirection={sortDirection}
            />

            <ElementsToDisplayButtonGroup
              onDisplay={onDisplay}
              whatEvetsToDisplay={whatEvetsToDisplay}
            />
          </div>
          <Clock time={time} />
        </nav>
      </MediaQuery>
    </React.Fragment>
  );
};

export default NavBar;

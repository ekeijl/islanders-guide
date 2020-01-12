import React, { Fragment, useState } from "react";
import Modal from "./Modal";
import Button from "./Button";
import "./header.css";

const Title = ({ children }) => (
  <h1 className="title">
    <span>{children}</span>
  </h1>
);

const Help = () => (
  <Fragment>
    <Title>About</Title>
    <p>
      This is a tool made for the city building game{" "}
      <a href="https://store.steampowered.com/app/1046030/ISLANDERS/">
        Islanders
      </a>
      .
    </p>

    <p>
      It shows the positive or negative bonus points for buildings within reach.
    </p>

    <p>
      An arrow pointing to a building means that it contributes to the score of
      placing that building. For example, a Fisher will give +7 points to a City
      Center
    </p>

    <h4>Credits</h4>
    <ul>
      <li>GrizzlyGames for making this beautiful game.</li>
      <li>
        xesolor made the{" "}
        <a href="https://steamcommunity.com/sharedfiles/filedetails/?id=1816920916">
          building graph
        </a>{" "}
        that inspired me to build this app.
      </li>
      <li>
        Capp'n Saccade for the original{" "}
        <a href="https://steamcommunity.com/sharedfiles/filedetails/?id=1704459130">
          community hub guide
        </a>
        .
      </li>
    </ul>
  </Fragment>
);

const Config = ({ onSet }) => (
  <div>
    <Title>Settings</Title>
    <p>Do stuff</p>
  </div>
);

const Header = () => {
  let [modal, setModal] = useState(null);

  return (
    <div className="header">
      <div className="header-left">
        <img className="logo" src="/logo.png" alt="Islanders building tool" />
        <h1>Islanders Guide</h1>
      </div>
      <div>
        <Button onClick={() => setModal("help")}>?</Button>
      </div>

      <Modal show={!!modal} onHide={() => setModal(null)}>
        <div className="modal-content">
          {modal === "help" ? <Help /> : <Config />}
          <Button type="white" onClick={() => setModal(null)}>
            ✓
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Header;

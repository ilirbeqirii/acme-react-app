import React from "react";
import Menu from "../menu/Menu";
import { Outlet } from "react-router-dom";
import "./Shell.css";

function Shell() {
  return (
    <React.Fragment>
      <Menu />

      <div className="container main-content">
        <Outlet />
      </div>
    </React.Fragment>
  );
}

export default Shell;

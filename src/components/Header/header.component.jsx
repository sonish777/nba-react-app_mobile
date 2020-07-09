import React from "react";
import classes from "./header.module.css";
import { Link } from "react-router-dom";

import FontAwesome from "react-fontawesome";
import SideNav from "./SideNav/sidenav.component";
import Backdrop from "../../ui/Backdrop/backdrop";

const Header = (props) => {
  const navBars = () => {
    return (
      <div className={classes.bars}>
        <FontAwesome
          name="bars"
          onClick={props.OnToggleSideNav}
          style={{
            color: "#dfdfdf",
            padding: "10px",
            cursor: "pointer",
          }}
        />
      </div>
    );
  };

  const logo = () => {
    return (
      <Link to="/" className={classes.logo}>
        <img src="/images/nba_logo.png" alt="NBA LOGO" />
      </Link>
    );
  };

  return (
    <header className={classes.header}>
      <SideNav user={props.user} showNav={props.showNav} />
      <Backdrop
        showBackdrop={props.showNav}
        toggleBackdrop={props.OnToggleSideNav}
      />
      <div className={classes.header__links}>
        {navBars()}
        {logo()}
      </div>
    </header>
  );
};

export default Header;

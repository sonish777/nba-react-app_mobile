import React from "react";
import FontAwesome from "react-fontawesome";
import { Link, withRouter } from "react-router-dom";

import classes from "./sidenav_items.module.css";
import { firebase } from "../../../../firebase";

const listItems = [
  {
    icon: "home",
    text: "Home",
    route: "/",
    login: "",
  },
  {
    icon: "file-text-o",
    text: "News",
    route: "/news",
    login: "",
  },
  {
    icon: "play",
    text: "Videos",
    route: "/videos",
    login: "",
  },
  {
    icon: "sign-in",
    text: "Dashboard",
    route: "/dashboard",
    login: false,
  },
  {
    icon: "sign-in",
    text: "Sign in",
    route: "/signin",
    login: true,
  },
  {
    icon: "sign-out",
    text: "Sign out",
    route: "/sign-out",
    login: false,
  },
];

const element = (item, i) => (
  <div className={classes.sidenav__items} key={i}>
    <Link to={item.route}>
      <FontAwesome name={item.icon} />
      {item.text}
    </Link>
  </div>
);

const SideNavItems = (props) => {
  // console.log(props);
  const restricted = (item, i) => {
    let template = null;

    if (props.user === null && item.login) {
      template = element(item, i);
    }

    if (props.user !== null && !item.login) {
      if (item.route === "/sign-out") {
        template = (
          <div
            className={classes.sidenav__items}
            key={i}
            onClick={() => {
              firebase
                .auth()
                .signOut()
                .then(() => {
                  props.history.push("/");
                });
            }}
          >
            <FontAwesome name={item.icon} />
            {item.text}
          </div>
        );
      } else {
        template = element(item, i);
      }
    }

    return template;
  };

  return listItems.map((item, i) => {
    return item.login !== "" ? restricted(item, i) : element(item, i);
  });
};

export default withRouter(SideNavItems);

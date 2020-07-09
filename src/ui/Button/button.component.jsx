import React from "react";

import classes from "./button.module.css";
import { Link } from "react-router-dom";

const Button = (props) => {
  let template = null;

  switch (props.type) {
    case "loadmore":
      template = (
        <button className={classes.btn} onClick={props.onClickHandler}>
          {props.children}
        </button>
      );
      break;

    case "linkto":
      template = (
        <Link to={props.link} className={classes.btn}>
          {props.children}
        </Link>
      );
      break;

    default:
      template = null;
  }

  return template;
};

export default Button;

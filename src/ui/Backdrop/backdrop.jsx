import React from "react";
import classes from "./backdrop.module.css";

const Backdrop = (props) => {
  return props.showBackdrop ? (
    <div className={classes.backdrop} onClick={props.toggleBackdrop}></div>
  ) : null;
};

export default Backdrop;

import React from "react";
import FontAwesome from "react-fontawesome";
import moment from "moment";

import classes from "./card-info.module.css";

const formatDate = (date) => {
  return moment(date).format(" MM-DD-YYYY");
};

const CardInfo = (props) => {
  // console.log(props);
  const team = props.teams.find((item) => item.teamId === props.team);
  // console.log(props);
  return (
    <div className={classes.cardinfo}>
      <span className={classes.cardinfo__team}>{team ? team.name : null}</span>
      <span className={classes.cardinfo__date}>
        <FontAwesome name="clock-o" />
        {formatDate(props.date)}
      </span>
    </div>
  );
};

export default CardInfo;

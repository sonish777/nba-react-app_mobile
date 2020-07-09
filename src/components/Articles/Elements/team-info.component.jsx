import React from "react";

import classes from "../articles.module.css";

const TeamInfo = (props) => {
  return (
    <div className={classes.teaminfo}>
      <div
        className={classes.teaminfo__thumbnail}
        style={{
          backgroundImage: `url(/images/teams/${props.team.logo})`,
        }}
      ></div>
      <div className={classes.teaminfo__details}>
        <span>
          {props.team.city} {props.team.name}
        </span>
        <br />
        <strong>
          W{props.team.stats[0].wins}-L{props.team.stats[0].defeats}
        </strong>
      </div>
    </div>
  );
};

export default TeamInfo;

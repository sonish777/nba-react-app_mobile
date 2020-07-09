import React from "react";

import classes from "../videos-list.module.css";
import VideosListItem from "../VideosListItem/videos-list-item.component";

const VideosRelated = (props) => {
  return (
    <div className={classes.videosrelated}>
      <VideosListItem data={props.data} teams={props.teams} />
    </div>
  );
};

export default VideosRelated;

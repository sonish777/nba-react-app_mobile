import React from "react";

import classes from "./videos-list-item.module.css";
import { Link } from "react-router-dom";
import CardInfo from "../../CardInfo/card-info.component";

const VideosListItem = (props) => {
  return props.data.map((item, i) => {
    return (
      <Link to={`/videos/${item.id}`} key={i}>
        <div className={classes.videoslistitem}>
          <div
            className={classes.videoslistitem__img}
            style={{
              background: `url(/images/videos/${item.image})`,
            }}
          >
            <div></div>
          </div>

          <div className={classes.videoslistitem__details}>
            <CardInfo teams={props.teams} team={item.team} date={item.date} />
            <h2>{item.title}</h2>
          </div>
        </div>
      </Link>
    );
  });
};

export default VideosListItem;

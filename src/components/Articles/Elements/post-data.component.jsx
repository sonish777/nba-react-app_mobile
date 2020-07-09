import React from "react";
import moment from "moment";

import classes from "../articles.module.css";

const PostData = (props) => {
  return (
    <div className={classes.postdata}>
      Date: <span>{moment(props.date).format(" MM-DD-YYYY")}</span>
      <br />
      Author: <span>{props.author}</span>
    </div>
  );
};

export default PostData;

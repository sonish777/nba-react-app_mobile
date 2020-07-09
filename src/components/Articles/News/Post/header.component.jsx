import React from "react";

import TeamInfo from "../../Elements/team-info.component";
import PostData from "../../Elements/post-data.component";

const Header = (props) => {
  return (
    <div>
      {props.team ? <TeamInfo team={props.team} /> : null}
      {<PostData date={props.date} author={props.author} />}
    </div>
  );
};

export default Header;

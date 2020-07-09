import React from "react";

import TeamInfo from "../../Elements/team-info.component";

const Header = (props) => {
  return <div>{props.team ? <TeamInfo team={props.team} /> : null}</div>;
};

export default Header;

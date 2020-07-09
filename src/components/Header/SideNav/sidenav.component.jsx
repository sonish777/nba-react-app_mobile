import React from "react";

import classes from "./sidenav.module.css";
import SideNavItems from "./sidenav_items/sidenav_items.component";

const SideNav = (props) => {
  return (
    <div
      className={`${classes.sidenav} ${props.showNav ? classes.show : null}`}
    >
      <SideNavItems {...props} />
    </div>
  );
};

export default SideNav;

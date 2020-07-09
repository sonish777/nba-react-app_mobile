import React from "react";
import { CURRENT_YEAR } from "../../config";

import classes from "./footer.module.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className={classes.footer}>
      <Link to="/" className={classes.logo}>
        <img src="/images/nba_logo.png" alt="Footer Logo" />
      </Link>
      <div className={classes.copyright}>
        @NBA {CURRENT_YEAR} All rights reserved.
      </div>
    </div>
  );
};

export default Footer;

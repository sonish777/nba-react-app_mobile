import React, { Component } from "react";
import "./layout.css";

import Header from "../../components/Header/header.component";
import Footer from "../../components/Footer/footer.component";

class Layout extends Component {
  state = {
    showNav: false,
  };

  toggleSideNav = () => {
    this.setState({
      showNav: !this.state.showNav,
    });
  };

  render() {
    return (
      <div>
        <Header
          user={this.props.user}
          showNav={this.state.showNav}
          OnToggleSideNav={this.toggleSideNav}
        />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default Layout;

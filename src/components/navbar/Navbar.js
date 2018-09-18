import React, { Component } from "react";
import Home from "../pages/Home";
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button
} from "reactstrap";

import { Route, NavLink, HashRouter } from "react-router-dom";

export default class Navigation extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <HashRouter>
        <div>
          <Navbar color="dark" dark expand="md">
            <NavbarBrand href="#"> Vouch </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink to="/">
                  <Button color="dark"> Tickets </Button>
                </NavLink>
              </NavItem>
            </Nav>
          </Navbar>
          <Route exact path="/" component={Home} />
        </div>
      </HashRouter>
    );
  }
}

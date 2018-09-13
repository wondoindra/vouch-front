import React, { Component } from "react";
import Home from "../pages/Home";
import Create from "../pages/Create";
import Delete from "../pages/Delete";
import Update from "../pages/Update";
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
              <NavItem>
                <NavLink to="/Create">
                  <Button color="dark"> Create </Button>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/Update">
                  <Button color="dark"> Update </Button>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/Delete">
                  <Button color="dark"> Delete </Button>
                </NavLink>
              </NavItem>
            </Nav>
          </Navbar>
          <Route path="/Create" component={Create} />
          <Route path="/Update" component={Update} />
          <Route path="/Delete" component={Delete} />
          <Route exact path="/" component={Home} />
        </div>
      </HashRouter>
    );
  }
}

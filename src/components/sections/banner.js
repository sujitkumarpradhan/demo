import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom";
import ReactGA from "react-ga";
import Logo from "../../assets/Logo.png";

import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
  Thumbnail,
  Button,
  Jumbotron,
  Popover,
  Tooltip,
  Modal,
  ButtonGroup,
  DropdownButton,
  nav
} from "react-bootstrap";
import { Grid, Row, Col } from "react-bootstrap";

class Banner extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <Col className="logoTitle" xs={12} md={12}>
            <img className="logoThankhues" alt="Amazon" src={Logo} />
          </Col>

          <Col className="aboutLogo" xs={12} md={12}>
          ThankHues is a platform, where an appreciation is given from a person in the form of a painted canvas to another person of a different location.
          </Col>
        </Row>
      </Grid>
    );
  }
}
export default withRouter(Banner);

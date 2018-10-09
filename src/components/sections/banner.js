import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom";
import ReactGA from "react-ga";
import Logo from "../../assets/Logo.png";
import video from "../../assets/video-player.svg";
import faq from "../../assets/question.svg";
import info from "../../assets/info.svg";
import comment from "../../assets/chat.svg";

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
          <Col className="aboutLogo" xs={8} md={8}>
          </Col>
          <Col className="aboutLogo" xs={4} md={4}>
           <a href="https://s3-ap-northeast-1.amazonaws.com/l9-video/e1e80faab1c2555b5dda05e101ae9337512c56996aa35afa689329129340a98c252fa833661b16bad3c452288ade71d3a11fe873e78ecd88f4bc8c170194604e.MP4" target="_blank"><img className="icon" src={video}></img></a> 
            <img className="icon" src={faq}></img>
            <img className="icon" src={info}></img>
            <img className="icon" src={comment}></img>
          </Col>
        </Row>
      </Grid>
    );
  }
}
export default withRouter(Banner);

import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom";
import ReactGA from 'react-ga';
import "../../style/global.css";

import {
    Navbar,
    Nav,
    NavItem,
    NavDropdown,
    MenuItem,
    Thumbnail,
    Button,
    Popover,
    Tooltip,
    Modal,
    ButtonGroup,
    DropdownButton,
    nav
} from "react-bootstrap";
import { Grid, Row, Col } from "react-bootstrap";




class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alias: this.props.match.params.userAlias,
            playvideo: false,
            mainColor: "",
            pageType: "winter",
            mood: "crazy",
            navBar: "right",
            selected: "home",
            intervalId: ""
        };
        this.updatelink = this.updatelink.bind(this);
    }


    updatelink(value) {
        ReactGA.event({
            category: 'UserAction',
            action: value,
            label: 'Header' + value
          });
          
        this.setState({
            selected: value
        });
    }


    render() {
        return (

    <Navbar>
  <Navbar.Header>
    <Navbar.Brand>
      <a href="#home">Thankhues</a>
    </Navbar.Brand>
  </Navbar.Header>
  <Nav>
    <NavItem eventKey={1} href="#">
    <Link to={`/home/${Math.random()}/${this.props.alias}`}
                            style={{
                                ...styles.link,
                                color: this.props.mainColor,
                                fontWeight: this.state.selected.includes("home")
                                    ? 600
                                    : 200
                            }}
                            onClick={() => this.updatelink("home")}
                        >
                            Home{" "}
                        </Link>
    </NavItem>
    <NavItem eventKey={2} href="#">
    <Link
                            to={`/stars/${this.props.alias}`}
                            style={{
                                ...styles.link,
                                color: this.props.mainColor,
                                fontWeight: this.state.selected.includes(
                                    "stars"
                                )
                                    ? 600
                                    : 200
                            }}
                            onClick={() => this.updatelink("stars")}
                        >
                            CCS Stars
                        </Link>
    </NavItem>
  </Nav>
</Navbar>

            // <div className="navigation_home">
            //     <ul>
            //         <li>
            //             <Link
            //                 to={`/home/${Math.random()}/${this.props.alias}`}
            //                 style={{
            //                     ...styles.link,
            //                     color: this.props.mainColor,
            //                     fontWeight: this.state.selected.includes("home")
            //                         ? 600
            //                         : 200
            //                 }}
            //                 onClick={() => this.updatelink("home")}
            //             >
            //                 Home{" "}
            //             </Link>
            //         </li>
            //         <li>
            //             <Link
            //                 to={`/stars/${this.props.alias}`}
            //                 style={{
            //                     ...styles.link,
            //                     color: this.props.mainColor,
            //                     fontWeight: this.state.selected.includes(
            //                         "stars"
            //                     )
            //                         ? 600
            //                         : 200
            //                 }}
            //                 onClick={() => this.updatelink("stars")}
            //             >
            //                 CCS Stars
            //             </Link>
            //         </li>
            //         <li>
            //             <Link
            //                 to={`/about/${this.props.alias}`}
            //                 style={{
            //                     ...styles.link,
            //                     color: this.props.mainColor,
            //                     fontWeight: this.state.selected.includes(
            //                         "about"
            //                     )
            //                         ? 600
            //                         : 200
            //                 }}
            //                 onClick={() => this.updatelink("about")}
            //             >
            //                 About L9
            //             </Link>
            //         </li>

            //         <li>
            //             <Link
            //                 to={`/faq/${this.props.match.params.userAlias}`}
            //                 style={{
            //                     ...styles.link,
            //                     color: this.props.mainColor,
            //                     fontWeight: this.state.selected.includes("faq")
            //                         ? 600
            //                         : 200
            //                 }}
            //                 onClick={() => this.updatelink("faq")}
            //             >
            //                 FAQs{" "}
            //             </Link>
            //         </li>
            //     </ul>
            // </div>
        );
    }
}
export default withRouter(Header);
const styles = {
    buttonColor: {},
    pageType: {},
    navBar: {},
    mood: {},
    line: {},
    link: {},
    NavItem: {},
    Monthly: {
        left: "44%"
    },
    Annual: {
        left: "46%"
    },
    l9logo: {},
    video: {},
    playButton: {},
    close: {
        position: "absolute",
        fontSize: "32px",
        right: "15px",
        top: "15px"
    },
    footermsg: {
        fontSize: "16px",
        width: "60px",
        fontWeight: "200",
        paddingLeft: "8px"
    },
    title: {}
};

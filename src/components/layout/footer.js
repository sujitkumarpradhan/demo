import React, { Component } from "react";
import Amazonlogo from "../../assets/Amazon.svg";
import "../../style/global.css";

class Footer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div style={styles.footer} className="feedback footer">
                    <footer>
                        <img style={styles.logo} alt="Amazon" src={Amazonlogo} />
                        <b> CCS &nbsp; </b> Creative and Campaign management
                        services.©2018, Amazon.com, Inc.All Rights Reserved.
                    </footer>
                    <span className="footerLink">
                        <a
                            href="https://trawler.amazon.com/l9feedback"
                            target="_blank"
                        >
                            <i className="far fa-comments" /> Got feedback for us?
                            &nbsp;&nbsp;
                        </a>
                        |
                        <a
                            href="https://tt.amazon.com/quicklink/Q000886055"
                            target="_blank"
                        >
                            &nbsp;&nbsp;Report issue
                        </a>
                    </span>
                </div>
            </div>
        );
    }
}

const styles = {
    // pageDescription: {
    //     paddingTop: 10,
    //     paddingBottom: 10,
    //     textAlign: "center",
    //     display: "block",
    //     fontSize: "14px",
    //     width: "960px",
    //     height: "80px",
    //     border: 1,
    //     margin: "0 auto",
    //     fontFamily: "HelveticaNeue",
    //     color: "#666",
    //     background: "transparent",
    //     resize: "auto"
    // },
    // pagePadding: {
    //     padding: 10,
    //     width: "100%",
    //     position: "fixed",
    //     backgroundColor: "rgba(255, 255, 255, 0.7)",
    //     bottom: 0,
    //     boxShadow: "rgba(77, 77, 77, 0.62) 1px 2px 11px 1px"
    // },
    footer: {
        padding: 20,
        fontSize: 11,
        color: "#999",
        // display: "flex",
        justifyContent: "center",
        backgroundColor: "#1b2531",
        width: "100%",
        bottom: 0,
        position: "fixed",
        left: 0,
        zIndex: 100,
        alignItems: "center"
    },
    logo: {
        height: 14,
        paddingRight: 20,
        position: "relative",
        top: "2px"
    }
};

export default Footer;

import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { Query, Mutation } from "react-apollo";
import { ApolloProvider } from "react-apollo";
import ReactGA from "react-ga";
import $ from "jquery";
import Img1 from "../../assets/Test/1.jpg";
import Img2 from "../../assets/Test/2.jpg";

import Img3 from "../../assets/Test/3.jpg";

import Img4 from "../../assets/Test/4.jpg";

import Img5 from "../../assets/Test/5.jpg";

import Img6 from "../../assets/Test/6.jpg";
import gql from "graphql-tag";

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
  nav,
  Grid,
  Row,
  Col
} from "react-bootstrap";

// import "./all/global.css";

const GET_Art = gql`
    query ListArts {
      listArts {
        items {
            ArtID
            Title
            Description
            CreatedBy
            CreatedByAlias
            CreatedByAbout
            AwardedTo
            AwardedToAlias
            AwardedToFor
            ArtURL
          }
        }
    }
`;


class Art extends React.Component {
  constructor(props) {
    super(props);

    this.Gallerly = this.Gallerly.bind(this);
    this.load = this.load.bind(this);
    this.calculateRowNumbers = this.calculateRowNumbers.bind(this);
    this.events = this.events.bind(this);
    this.renderPreview = this.renderPreview.bind(this);
    this.nextImageNode = this.nextImageNode.bind(this);
    this.prevImageNode = this.prevImageNode.bind(this);

    this.ClickRender = this.ClickRender.bind(this);
  }

  Gallerly($app) {
    this.$app = $app;
    this.thumbnail_height = 315;
    this.preview_height = 300;
    this.totalRows = 0;
    // console.log("loading...")
    this.load($app);
  }

  load($app) {
    this.calculateRowNumbers($app);
    this.events($app);
  }

  calculateRowNumbers($app) {
    var thumbnails = $app.querySelectorAll(".image-viewer .thumbnail");

    var prevOffsetTop = 0;
    var rowNum = 0;

    for (var i = 0; i < thumbnails.length; i++) {
      if (thumbnails[i].offsetTop != prevOffsetTop) {
        rowNum++;
        prevOffsetTop = thumbnails[i].offsetTop;
      }
      thumbnails[i].setAttribute("data-row", rowNum);
    }

    this.totalRows = rowNum;
  }

  events($app) {
    var that = this;
    var $curImg;

    // On click of a thumbnail
    $app
      .querySelector(".image-viewer")
      .addEventListener("click", function (event) {
        // $("#gallerly").addClass("margin-bottom-G");
        if (
          event.target.tagName === "IMG" &&
          event.target.parentElement.classList.contains("thumbnail")
        ) {
          // remove .movie-down class from .thumbnail class elements
          var thumbnails = $app.querySelectorAll(".thumbnail");
          var thumbnail = event.target.parentElement;
          var imgNode = event.target;
          $curImg = imgNode;
          for (var k = 0; k < thumbnails.length; k++) {
            thumbnails[k].classList.remove("move-down");
          }

          // add .move-down class to the bottom row elements
          var rowNumClicked = +thumbnail.getAttribute("data-row");
          for (var i = rowNumClicked + 1; i <= that.totalRows; i++) {
            var bottomRowElements = $app.querySelectorAll(
              '.thumbnail[data-row="' + i + '"]'
            );
            for (var j = 0; j < bottomRowElements.length; j++) {
              bottomRowElements[j].classList.add("move-down");
            }
          }
          that.prevRowNum = rowNumClicked;

          // place the .preview at the right place and populate the details accordingly
          var preview = $app.querySelector(".image-viewer .preview");
          var targetImage = event.target;

          preview
            .querySelector("img")
            .setAttribute("src", targetImage.getAttribute("src"));
          preview.querySelector(".title").innerHTML = targetImage.getAttribute(
            "data-title"
          );
          preview.querySelector(
            ".description"
          ).innerHTML = targetImage.getAttribute("data-description");

          preview.querySelector(
            ".namedesigner"
          ).innerHTML = targetImage.getAttribute("data-namedesigner");

          preview.querySelector(
            ".discriptiondesigner"
          ).innerHTML = targetImage.getAttribute("data-discriptiondesigner");

          preview.classList.remove("hide");
          preview.style.top =
            ((that.thumbnail_height * rowNumClicked )  + 14 ) + "px";
          preview.querySelector(".arrow").style.left =
            targetImage.parentElement.offsetLeft +
            targetImage.width / 2 -
            15 +
            "px";

          window.scroll(0, (that.thumbnail_height * rowNumClicked) + 14  + 40);
          // show or hide .next .prev links

          // console.log("top-----------",preview.style.top );
          if (that.nextImageNode($curImg)) {
            preview.querySelector(".next").classList.remove("hide");
          } else {
            preview.querySelector(".next").classList.add("hide");
          }

          if (that.prevImageNode($curImg)) {
            preview.querySelector(".prev").classList.remove("hide");
          } else {
            preview.querySelector(".prev").classList.add("hide");
          }
        }
      });

    // on click of action buttons in .preview such as close, prev and next
    $app.querySelector(".preview").addEventListener("click", function (event) {
      var $nextImg;
      var $prevImg;
      var targetNode = event.target;
      var targetClassList = event.target.classList;
      var preview = $app.querySelector(".image-viewer .preview");

      if (targetClassList.contains("close-preview")) {
        // $("#gallerly").classList.remove("margin-bottom-G");
        // var x =  $app.querySelector('#gallerly');
        // console.log(x);
        var thumbnails = $app.querySelectorAll(".thumbnail");
        $app.querySelector(".preview").classList.add("hide");

        for (var i = 0; i < thumbnails.length; i++) {
          thumbnails[i].classList.remove("move-down");
        }
      } else if (targetClassList.contains("prev")) {
        $nextImg = $curImg;
        $prevImg = that.prevImageNode($curImg);

        $curImg = $prevImg;
        that.renderPreview($curImg);
      } else if (targetClassList.contains("next")) {
        $nextImg = that.nextImageNode($curImg);
        $prevImg = $curImg;

        $curImg = $nextImg;
        that.renderPreview($curImg);
      }
    });

    window.addEventListener("keydown", function (event) {
      // console.log(event.keyCode);

      // right - next
      if (event.keyCode === 39) {
        if (!that.nextImageNode($curImg)) {
          return false;
        }

        var $nextImg = that.nextImageNode($curImg);
        var $prevImg = $curImg;

        var $curImg = $nextImg;
        that.renderPreview($curImg);
      }
      // left - prev
      else if (event.keyCode === 37) {
        if (!that.prevImageNode($curImg)) {
          return false;
        }

        $nextImg = $curImg;
        $prevImg = that.prevImageNode($curImg);

        $curImg = $prevImg;
        that.renderPreview($curImg);
      }
    });
  }

  nextImageNode($img) {
    var nextSibling = $img.parentElement.nextSibling;
    while (nextSibling && nextSibling.nodeType != 1) {
      nextSibling = nextSibling.nextSibling;
    }

    if (nextSibling && nextSibling.classList.contains("thumbnail")) {
      return nextSibling.querySelector("img");
    } else {
      return false;
    }
  }

  prevImageNode($img) {
    var previousSibling = $img.parentElement.previousSibling;
    while (previousSibling && previousSibling.nodeType != 1) {
      previousSibling = previousSibling.previousSibling;
    }

    if (previousSibling && previousSibling.classList.contains("thumbnail")) {
      return previousSibling.querySelector("img");
    } else {
      return false;
    }
  }

  renderPreview($img) {
    var rowNum = +$img.parentElement.getAttribute("data-row");
    var preview = this.$app.querySelector(".preview");

    // place the .preview

    if (this.prevRowNum !== rowNum) {
      var thumbnails = this.$app.querySelectorAll(".thumbnail");

      for (var k = 0; k < thumbnails.length; k++) {
        thumbnails[k].classList.remove("move-down");
      }

      for (var i = rowNum + 1; i <= this.totalRows; i++) {
        var bottomRowElements = this.$app.querySelectorAll(
          '.thumbnail[data-row="' + i + '"]'
        );
        for (var j = 0; j < bottomRowElements.length; j++) {
          bottomRowElements[j].classList.add("move-down");
        }
      }

      this.prevRowNum = rowNum;
      preview.style.top = ((this.thumbnail_height * rowNum ) + 14) + "px";
      window.scroll(0, (this.thumbnail_height * rowNum) + 14  + 40);

      // window.scroll(400, 400);
    }

    // show or hide .next / .prev links

    if (this.nextImageNode($img)) {
      preview.querySelector(".next").classList.remove("hide");
    } else {
      preview.querySelector(".next").classList.add("hide");
    }

    if (this.prevImageNode($img)) {
      preview.querySelector(".prev").classList.remove("hide");
    } else {
      preview.querySelector(".prev").classList.add("hide");
    }

    // populate preview content

    preview.querySelector("img").setAttribute("src", $img.getAttribute("src"));
    preview.querySelector(".title").innerHTML = $img.getAttribute("data-title");
    preview.querySelector(".description").innerHTML = $img.getAttribute(
      "data-description"
    );
    preview.querySelector(".namedesigner").innerHTML = $img.getAttribute(
      "data-namedesigner"
    );

    preview.querySelector(".discriptiondesigner").innerHTML = $img.getAttribute(
      "data-discriptiondesigner"
    );

    // position the arrow

    preview.querySelector(".arrow").style.left =
      $img.parentElement.offsetLeft + $img.width / 2 - 15 + "px";
  }

  async componentDidMount() {
    // setTimeout(
    //   function () {
    //     var $gallerly = document.querySelector("#gallerly");
    //     var gallerly = this.Gallerly($gallerly);
    //   }.bind(this),
    //   3000
    // );
  }

  ClickRender() {
    var $gallerly = document.querySelector("#gallerly");
    var gallerly = this.Gallerly($gallerly);
  }

  render() {

    return (
      <Query query={GET_Art}>
        {({ loading, error, data }) => {


          if (loading) {
            return <div className="loadingClass">Loading...</div>;
          }
          if (data) {
            console.log(data.listArts.items[0]);
          }

          return (
            <div id="gallerly" className="container">
              <div className="image-viewer">

                {data.listArts.items
                  .map((art, index) => {
                    // console.log("----------------",art);

                    if (index === data.listArts.items.length - 1) {
                      console.log("Done");

                      setTimeout(
                        function () {
                          this.ClickRender();
                        }.bind(this),
                        100
                      );

                    }
                    return (
                      <a className="thumbnail" key={index}>
                        <img
                          src={art.ArtURL}
                          // className="cf1"
                          data-title={art.Title}
                          data-description={art.Description}
                          data-namedesigner={art.CreatedBy}
                          data-discriptiondesigner={art.CreatedByAbout} />

                        {/* <div className="position-absolute">
                          <img className="width-100" src={`https://badgephotos.amazon.com/?uid=sujpradh&Region=Master&FullsizeImage=Yes`}></img>
                          <p>This is nice for exposing more information about an image.</p>
                          <p>Any content can go here.</p>
                        </div> */}
                      </a>


                    );
                  })}

                {/* <a className="thumbnail">
            <img
              src={data.listArts.items[0].ArtURL}
              className="cf1"
              data-title="NASA Earth Image1"
              data-description="Earth, also called the world[n 5] (and, less frequently, Gaia[n 6] or, in Latin, Terra[26]), is the third planet from the Sun, the densest planet in the Solar System, the largest of the Solar System's four terrestrial planets, and the only astronomical object known to accommodate life. The earliest life on Earth arose at least 3.5 billion years ago."
            />
          </a> */}
                {/* <a className="thumbnail">
                  <img
                    src={Img2}
                    className="cf1"
                    data-title="NASA Earth Image2"
                    data-description="Earth, also called the world[n 5] (and, less frequently, Gaia[n 6] or, in Latin, Terra[26]), is the third planet from the Sun, the densest planet in the Solar System, the largest of the Solar System's four terrestrial planets, and the only astronomical object known to accommodate life. The earliest life on Earth arose at least 3.5 billion years ago."
                  />
                </a>
                <a className="thumbnail">
                  <img
                    src={Img3}
                    className="cf1"
                    data-title="NASA Earth Image3"
                    data-description="Earth, also called the world[n 5] (and, less frequently, Gaia[n 6] or, in Latin, Terra[26]), is the third planet from the Sun, the densest planet in the Solar System, the largest of the Solar System's four terrestrial planets, and the only astronomical object known to accommodate life. The earliest life on Earth arose at least 3.5 billion years ago."
                  />
                </a>

                <a className="thumbnail">
                  <img
                    src={Img4}
                    className="cf1"
                    data-title="NASA Earth Image4"
                    data-description="Earth, also called the world[n 5] (and, less frequently, Gaia[n 6] or, in Latin, Terra[26]), is the third planet from the Sun, the densest planet in the Solar System, the largest of the Solar System's four terrestrial planets, and the only astronomical object known to accommodate life. The earliest life on Earth arose at least 3.5 billion years ago."
                  />
                </a>
                <a className="thumbnail">
                  <img
                    src={Img5}
                    className="cf1"
                    data-title="NASA Earth Image5"
                    data-description="Earth, also called the world[n 5] (and, less frequently, Gaia[n 6] or, in Latin, Terra[26]), is the third planet from the Sun, the densest planet in the Solar System, the largest of the Solar System's four terrestrial planets, and the only astronomical object known to accommodate life. The earliest life on Earth arose at least 3.5 billion years ago."
                  />
                </a>
                <a className="thumbnail">
                  <img
                    src={Img6}
                    className="cf1"
                    data-title="NASA Earth Image6"
                    data-description="Earth, also called the world[n 5] (and, less frequently, Gaia[n 6] or, in Latin, Terra[26]), is the third planet from the Sun, the densest planet in the Solar System, the largest of the Solar System's four terrestrial planets, and the only astronomical object known to accommodate life. The earliest life on Earth arose at least 3.5 billion years ago."
                  />
                </a>

                <a className="thumbnail">
                  <img
                    src={Img1}
                    className="cf1"
                    data-title="NASA Earth Image7"
                    data-description="Earth, also called the world[n 5] (and, less frequently, Gaia[n 6] or, in Latin, Terra[26]), is the third planet from the Sun, the densest planet in the Solar System, the largest of the Solar System's four terrestrial planets, and the only astronomical object known to accommodate life. The earliest life on Earth arose at least 3.5 billion years ago."
                  />
                </a>
                <a className="thumbnail">
                  <img
                    src={Img2}
                    className="cf1"
                    data-title="NASA Earth Image8"
                    data-description="Earth, also called the world[n 5] (and, less frequently, Gaia[n 6] or, in Latin, Terra[26]), is the third planet from the Sun, the densest planet in the Solar System, the largest of the Solar System's four terrestrial planets, and the only astronomical object known to accommodate life. The earliest life on Earth arose at least 3.5 billion years ago."
                  />
                </a>
                <a className="thumbnail">
                  <img
                    src={Img3}
                    className="cf1"
                    data-title="NASA Earth Image9"
                    data-description="Earth, also called the world[n 5] (and, less frequently, Gaia[n 6] or, in Latin, Terra[26]), is the third planet from the Sun, the densest planet in the Solar System, the largest of the Solar System's four terrestrial planets, and the only astronomical object known to accommodate life. The earliest life on Earth arose at least 3.5 billion years ago."
                  />
                </a>

                <a className="thumbnail">
                  <img
                    src={Img4}
                    className="cf1"
                    data-title="NASA Earth Image10"
                    data-description="Earth, also called the world[n 5] (and, less frequently, Gaia[n 6] or, in Latin, Terra[26]), is the third planet from the Sun, the densest planet in the Solar System, the largest of the Solar System's four terrestrial planets, and the only astronomical object known to accommodate life. The earliest life on Earth arose at least 3.5 billion years ago."
                  />
                </a>
                <a className="thumbnail">
                  <img
                    src={Img5}
                    className="cf1"
                    data-title="NASA Earth Image11"
                    data-description="Earth, also called the world[n 5] (and, less frequently, Gaia[n 6] or, in Latin, Terra[26]), is the third planet from the Sun, the densest planet in the Solar System, the largest of the Solar System's four terrestrial planets, and the only astronomical object known to accommodate life. The earliest life on Earth arose at least 3.5 billion years ago."
                  />
                </a>
                <a className="thumbnail">
                  <img
                    src={Img6}
                    className="cf1"
                    data-title="NASA Earth Image12"
                    data-description="Earth, also called the world[n 5] (and, less frequently, Gaia[n 6] or, in Latin, Terra[26]), is the third planet from the Sun, the densest planet in the Solar System, the largest of the Solar System's four terrestrial planets, and the only astronomical object known to accommodate life. The earliest life on Earth arose at least 3.5 billion years ago."
                    data-nameDesigner="Sujit"
                  />
                  <div className="position-absolute">
                    <img className="width-100" src={`https://badgephotos.amazon.com/?uid=sujpradh&Region=Master&FullsizeImage=Yes`}></img>
                    <p>This is nice for exposing more information about an image.</p>
                    <p>Any content can go here.</p>
                  </div>
                </a> */}

                {/* <div id="f1_container" className="thumbnail newSize">
            <div id="f1_card" class="shadow">
              <div class="front face">
                <img
                  src={Img6}
                  className="newSize"
                  data-title="NASA Earth Image12"
                  data-description="Earth, also called the world[n 5] (and, less frequently, Gaia[n 6] or, in Latin, Terra[26]), is the third planet from the Sun, the densest planet in the Solar System, the largest of the Solar System's four terrestrial planets, and the only astronomical object known to accommodate life. The earliest life on Earth arose at least 3.5 billion years ago."
                />
              </div>
              <div class="back face center">
                <p>This is nice for exposing more information about an image.</p>
                <p>Any content can go here.</p>
              </div>
            </div>
          </div> */}

                {/* <div id="f1_container" className="thumbnail newSize">
            
            <img src={Img6} id="f1_card" className="front face newSize" data-title="NASA Earth Image12"
                  data-description="Earth, also called the world[n 5] (and, less frequently, Gaia[n 6] or, in Latin, Terra[26]), is the third planet from the Sun, the densest planet in the Solar System, the largest of the Solar System's four terrestrial planets, and the only astronomical object known to accommodate life. The earliest life on Earth arose at least 3.5 billion years ago."
                />
       
               
              <div id="f2_card" class="back face center">
                <p>This is nice for exposing more information about an image.</p>
                <p>Any content can go here.</p>
              </div>
      
          </div> */}

                {/* <a
          className="thumbnail flip-container"
          ontouchstart="this.classList.toggle('hover');"
        >
          
            <img src={Img6}  className="front flipper" data-title="NASA Earth Image12"
                  data-description="Earth, also called the world[n 5] (and, less frequently, Gaia[n 6] or, in Latin, Terra[26]), is the third planet from the Sun, the densest planet in the Solar System, the largest of the Solar System's four terrestrial planets, and the only astronomical object known to accommodate life. The earliest life on Earth arose at least 3.5 billion years ago."
                />
                <div className="flipper">
            <div className="back">
              <Col className="cardBack" xs={3} md={3}>
              
                <div className="cardBack-copy">
                  <div className="cardBack-title">Thankhues</div>
                  <div className="clap-number">27</div>
                  <div className="clap-text">CLAPS</div>
                  
                </div>
              </Col>
            </div>
          </div>
        </a> */}

                <div className="preview hide">
                  <div className="wrapper">
                    <span className="arrow" />
                    <a className="prev">&larr; Prev</a>
                    <div className="preview-content">
                      <img src="" />
                      <div className="content">
                        <h3 className="title" />
                        <span className="description" /> <br />
                        <div className="namedesigner"></div>
                        <div className="discriptiondesigner"></div>
                      </div>
                    </div>
                    <a className="next">Next &rarr;</a>
                    <a className="close-preview">Close</a>
                  </div>
                </div>



              </div>





            </div>
          );
        }}
      </Query>
    );
  }
}
export default withRouter(Art);

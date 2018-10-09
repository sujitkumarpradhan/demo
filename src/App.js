import React, { Component } from 'react';
import './App.css';
import Home from "./home";
import Footer from "./components/layout/footer";
import Header from "./components/layout/header";
import Banner from "./components/sections/banner";
import Art from "./components/sections/art";
import "./style/global.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Banner/>
        <Art/>
        <Home/>
        <Footer/>
      </div>
    );
  }
}

export default App;

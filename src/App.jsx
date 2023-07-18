import React from "react";
import "./App.scss";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import Header from "./components/header/Header";
import Main from "./components/main/Main";

function App() {
  return (
    <div className="container">
      <Header />
      <div className="main">
        <Main />
      </div>
    </div>
  );
}

export default App;

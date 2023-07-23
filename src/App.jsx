import React, { useEffect, useState } from "react";
import { FadeLoader } from "react-spinners";
import "./App.scss";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import Header from "./components/header/Header";
import Main from "./components/main/Main";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  });
  return (
    <React.Fragment>
      {loading ? (
        <div className="loader">
          <FadeLoader color="#9333EA" />
        </div>
      ) : (
        <div className="container">
          <Header />
          <div className="main">
            <Main />
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default App;

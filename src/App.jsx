import React, { useEffect, useState } from "react";
import { ClipLoader, FadeLoader } from "react-spinners";
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
  }, []);
  return (
    <React.Fragment>
      {loading ? (
        <div className="loader">
          <ClipLoader size={30} color="#9333EA" />
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

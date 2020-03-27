import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import ImageComponent from "./component/ImageComponent";
function App() {
  return (
    <div className="App">
      <h1>Modal popup</h1>
      <h4>To trigger the popup click the picture, please! </h4>
      <ImageComponent />
    </div>
  );
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
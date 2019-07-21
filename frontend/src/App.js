import React from "react";

import NavBar from "./components/NavBar";
import Info from "./components/Info";
import ImageUploader from "./components/ImageUploader";
import Explanation from "./components/Explanation";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <div className="container">
        <Info />
        <Explanation />
        <ImageUploader />
      </div>
    </React.Fragment>
  );
}

export default App;

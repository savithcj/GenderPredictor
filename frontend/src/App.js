import React from "react";

import NavBar from "./components/NavBar";
import Info from "./components/Info";
import ImageUploader from "./components/ImageUploader";
import Explanation from "./components/Explanation";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Info />
      <Explanation />
      <ImageUploader />
    </div>
  );
}

export default App;

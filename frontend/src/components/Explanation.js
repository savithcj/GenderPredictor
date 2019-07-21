import React from "react";

export default function Explanation() {
  return (
    <div className="container-fluid my-4">
      <p>
        When the evaluate button is pressed, the site makes a call to a RESTful API. The API uses the{" "}
        <a
          href="https://docs.opencv.org/3.4.1/d7/d8b/tutorial_py_face_detection.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          OpenCV Haar Feature-based Cascade Classifier
        </a>{" "}
        to detect if a face is present in the uploaded image. Any detected faces are then classified for gender using
        the CNN.
      </p>
      <p>
        In the event that the Haar Cascade Classifier fails to detect any faces, the uploaded image will be returned
        unchanged.
      </p>
    </div>
  );
}

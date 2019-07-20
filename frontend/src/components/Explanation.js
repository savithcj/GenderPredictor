import React from "react";

export default function Explanation() {
  return (
    <div className="container-fluid my-4">
      <p>
        When an image is uploaded, the site makes a call to a RESTful API. The API uses the{" "}
        <a
          href="https://docs.opencv.org/3.4.1/d7/d8b/tutorial_py_face_detection.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          OpenCV Haar Feature-based Cascade Classifier
        </a>{" "}
        to detect if a face is present in the uploaded image. Any detected faces are then evaluated for gender
        classification using the CNN.
      </p>
      <p>
        In the case that the Haar Cascade Classifier fails to detect any faces, the uploaded image will be returned
        unchanged.
      </p>
    </div>
  );
}

import React from "react";

export default function Info() {
  return (
    <div className="container-fluid my-4">
      <h4 className="my-4">Upload an image and get a gender prediction.</h4>
      <p>
        This website is a demo for a Convolutional Neural Network (CNN) model trained with the IMDB face images dataset.
      </p>
      <p>
        When an image is uploaded, the site makes an API call to a RESTful API. The API uses the{" "}
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

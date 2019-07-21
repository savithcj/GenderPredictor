import React from "react";
import Resizer from "../util/resizer";
import axios from "axios";

const APIUrl = "https://baroque-saucisson-79648.herokuapp.com/prediction";

class ImageUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      isLoading: false,
      isUploading: false,
      result: null
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("myImage", this.state.file);
    this.setState({ isLoading: true, file: null });
    const config = {
      headers: {
        "content-type": "image/jpeg"
      }
    };
    axios
      .post(APIUrl, this.state.file, config)
      .then(response => {
        this.setState({ result: response.data });
        this.setState({ isLoading: false });
      })
      .catch(error => {
        console.log("API call failed.");
      });
  }
  onChange(e) {
    this.setState({ isUploading: true, result: null });

    Resizer.imageFileResizer(
      e.target.files[0],
      1000,
      1000,
      "JPEG",
      60,
      0,
      uri => {
        const strImage = uri.replace(/^data:image\/[a-z]+;base64,/, "");
        //if there was an error converting the image to string, set the file in the state to null
        strImage !== "File Not Found" ? this.setState({ file: strImage }) : this.setState({ file: null });
      },
      "base64"
    );
    this.setState({ isUploading: false });
  }

  render() {
    const spinner = (
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );

    const selectedImage = this.state.file ? (
      <React.Fragment>
        <h5 className="text-center">Selected Image</h5>
        <img src={"data:image/jpg;base64," + this.state.file} alt="failed to load" className="img-fluid" />
      </React.Fragment>
    ) : null;

    const result = this.state.result ? (
      <React.Fragment>
        <h5 className="text-center">Result</h5>
        <img src={"data:image/jpg;base64," + this.state.result} alt="failed to load" className="img-fluid" />
      </React.Fragment>
    ) : null;

    const showSpinnerOrSelection = this.state.isUploading ? spinner : selectedImage;
    const showSpinnerOrResults = this.state.isLoading ? spinner : result;

    return (
      <div className="container-fluid my-5 text-center">
        <form onSubmit={this.onFormSubmit}>
          <div className="input-group">
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="inputGroupFile04"
                name="myImage"
                onChange={this.onChange}
                disabled={this.state.isLoading || this.state.isUploading}
              />
              <label className="custom-file-label text-left" htmlFor="inputGroupFile04">
                {this.state.file ? "Click evaluate" : "Select image"}
              </label>
            </div>
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="submit" disabled={!this.state.file}>
                Evaluate
              </button>
            </div>
          </div>
        </form>
        <div className="container-fluid my-5">
          {showSpinnerOrSelection}
          {showSpinnerOrResults}
        </div>
      </div>
    );
  }
}

export default ImageUploader;

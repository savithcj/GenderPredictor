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
      result: null,
      errorOccurred: false,
      errorMessage: null
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  //called when the evaluate button is clicked
  onFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("myImage", this.state.file);
    this.setState({ isLoading: true, file: null });

    axios({
      method: "post",
      url: APIUrl,
      timeout: 1000 * 30,
      headers: {
        "Content-Type": "image/jpeg"
      },
      data: this.state.file
    })
      .then(response => {
        this.setState({ result: response.data });
        this.setState({ isLoading: false });
      })
      .catch(error => {
        if (error.code === "ECONNABORTED") {
          this.setState({ errorOccurred: true, errorMessage: "API timed out. Please try again.", isLoading: false });
        } else {
          console.log("API call failed.", error);
          this.setState({ errorOccurred: true, errorMessage: "API call failed. Please try again.", isLoading: false });
        }
      });
  }

  //called when selecting an image
  onChange(e) {
    this.setState({ result: null, file: null, errorOccurred: false, errorMessage: null });

    Resizer.imageFileResizer(
      e.target.files[0],
      1000,
      1000,
      "JPEG",
      60,
      0,
      uri => {
        if (uri === "error") {
          this.setState({
            file: null,
            errorOccurred: true,
            errorMessage: "Error reading file. Please make sure the file is an image."
          });
        } else if (uri === "File Not Found") {
          this.setState({ file: null });
        } else {
          const strImage = uri.replace(/^data:image\/[a-z]+;base64,/, "");
          this.setState({ file: strImage });
        }
      },
      "base64"
    );
    e.target.value = null;
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

    const errorMessage = <h6>{this.state.errorMessage}</h6>;

    const showSpinnerOrResults = this.state.isLoading ? spinner : result;

    return (
      <div className="container-fluid my-5 text-center">
        <form onSubmit={this.onFormSubmit}>
          <div className="input-group">
            <div className="custom-file">
              <input
                title={this.state.file ? "Change file" : "Select file"}
                type="file"
                className="custom-file-input"
                id="inputGroupFile04"
                name="myImage"
                onChange={this.onChange}
                disabled={this.state.isLoading}
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
          {this.state.errorOccurred && this.state.errorMessage ? errorMessage : null}
          {selectedImage}
          {showSpinnerOrResults}
        </div>
      </div>
    );
  }
}

export default ImageUploader;

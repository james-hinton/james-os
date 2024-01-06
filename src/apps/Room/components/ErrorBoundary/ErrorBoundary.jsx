import React from "react";
import "./ErrorBoundary.scss";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error, errorInfo) {
    // You might also log the error to an error reporting service
    console.log(error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      // User-friendly error message
      return (
        <div
          style={{ padding: "20px", textAlign: "center" }}
          className="interactable error-boundary"
        >
          <h1>Oops! Something went wrong.</h1>
          <p>It looks like WebGL 2.0 might not be enabled on your browser.</p>
          <br />

          <div className="demo-gif-container">
            <img src="/models/demo.gif" alt="Room Demo" />
          </div>

          <p>
            WebGL is a technology that allows this application to display 3D
            graphics. Without it, you can't see my 3D Room.
          </p>
          <br />
          <h3>How to Enable WebGL:</h3>
          <p>
            Please check the following links to learn how to enable WebGL on
            your browser:
          </p>
          <ul className="error-list">
            <li>
              <a
                href="https://get.webgl.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                General WebGL Help
              </a>
            </li>
            <li>
              <a
                href="https://support.smartbear.com/crossbrowsertesting/docs/live-testing/enable-webgl-on-chrome.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                Enable WebGL in Google Chrome
              </a>
            </li>
            <li>
              <a
                href="https://help.interplaylearning.com/en/help/how-to-enable-webgl-in-firefox"
                target="_blank"
                rel="noopener noreferrer"
              >
                Enable WebGL in Mozilla Firefox
              </a>
            </li>
            <li>
              <a
                href="https://discussions.apple.com/thread/8655829?sortBy=best"
                target="_blank"
                rel="noopener noreferrer"
              >
                Enable WebGL in Safari
              </a>
            </li>
          </ul>
          <br />
          <br />
          <p>
            If you're still having issues after enabling WebGL, your device or
            browser might not support it, or there could be another issue.{" "}
            <br />
            <strong>
              I know that a lot of browsers have been disabling WebGL due to
              security concerns.
            </strong>
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

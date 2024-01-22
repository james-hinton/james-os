import { useState, useEffect } from "react";

import { pdfjs } from "react-pdf";
import { Document, Page } from "react-pdf";
import "./Resume.scss";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const Resume = ({
  appRef
}) => {

  const [pdfScale, setPdfScale] = useState(1);

  useEffect(() => {
    const appWidth = appRef?.current?.offsetWidth;

    const stylesConfig = [
      {
        max: 400,
        scale : 0.65
      },
      {
        max: 600,
        scale : 0.71
      },
      {
        max: 1000,
        scale : 0.9
      },
      {
        max: 1400,
        scale : 1.3
      },
      {
        default: true,
        scale : 1.5
      },
    ];

    for (const config of stylesConfig) {
      if (config.default || appWidth < config.max) {
        const scale = config.scale;
        setPdfScale(scale);
        break;
      }
    }
  }, [appRef?.current?.offsetWidth]);

  return (
    <div className="resume-container interactable">
      {/* Download button */}
      <a
        href="james-hinton-cv.pdf"
        download
        className="download-button"
      >
        Download PDF
      </a>

      {/* PDF viewer */}
      <Document file="james-hinton-cv.pdf" className="pdf-document">
        <Page
          pageNumber={1}
          scale={pdfScale}
          renderAnnotationLayer={false}
          renderTextLayer={false}
        />
        <Page
          pageNumber={2}
          scale={pdfScale}
          renderAnnotationLayer={false}
          renderTextLayer={false}
        />
      </Document>
    </div>
  );
};

export default Resume;

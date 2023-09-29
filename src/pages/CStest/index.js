// pages/DicomViewer.js

import { useEffect, useRef } from "react";
import dicomImageLoader from "@cornerstonejs/dicom-image-loader";
import cornerstone from "cornerstone-core";
import cornerstoneTools from "cornerstone-tools";
// import "cornerstone-core/dist/cornerstone.css";
// import "cornerstone-tools/dist/cornerstoneTools.css";

export default function DicomViewer() {
  const dicomContainerRef = useRef(null);

  useEffect(() => {
    // Initialize Cornerstone.js
    cornerstoneTools.external.cornerstone = cornerstone;
    cornerstoneTools.external.Hammer = window.Hammer;

    // Initialize the DICOM image loader
    dicomImageLoader.external.cornerstone = cornerstone;
    dicomImageLoader.external.dicomParser = dicomImageLoader.dicomParser;

    // Load a DICOM image
    const imageId = "public/0002.DCM"; // Replace with your DICOM image ID
    dicomImageLoader.loadImage(imageId).then((image) => {
      // Display the DICOM image in the container
      cornerstone.enable(dicomContainerRef.current);
      cornerstone.loadImage(imageId).then((loadedImage) => {
        cornerstone.displayImage(dicomContainerRef.current, loadedImage);
      });
    });

    return () => {
      // Cleanup when unmounting the component
      cornerstone.disable(dicomContainerRef.current);
    };
  }, []);

  return (
    <div>
      <h1>DICOM Viewer</h1>
      <div
        ref={dicomContainerRef}
        style={{ width: "100%", height: "500px" }}
      ></div>
    </div>
  );
}

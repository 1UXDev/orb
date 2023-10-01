import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Move the cornerstone imports inside the useEffect to avoid server-side rendering
function CornerstoneViewer() {
  const [imageId, setImageId] = useState(null);

  import("cornerstone-core").then((cornerstone) => {
    import("cornerstone-wado-image-loader").then(
      (cornerstoneWADOImageLoader) => {
        import("dicom-parser").then((dicomParser) => {
          // This code will only execute on the client-side

          // Configure the WADO Image Loader
          cornerstoneWADOImageLoader.external.cornerstone = cornerstone.default;
          cornerstoneWADOImageLoader.external.dicomParser = dicomParser.default;

          // Load a DICOM image after initialization
          const imageLoader = cornerstoneWADOImageLoader.createImageLoader();
          const url = "/0002.DCM";

          imageLoader
            .loadImage(url)
            .then((image) => {
              if (image) {
                // Set the loaded image as the active image
                cornerstone.default.getEnabledElements()[0].image = image;
                setImageId(image.imageId);
              } else {
                console.error("Failed to load DICOM image.");
              }
            })
            .catch((error) => {
              console.error("Error loading DICOM image:", error);
            });

          // Configure the viewer's viewport
          const element = document.getElementById("cornerstoneViewer");
          cornerstone.default.enable(element);
          cornerstone.default.setViewport(element, { scale: 1 });

          return () => {
            // Cleanup when the component is unmounted
            cornerstone.default.disable(element);
          };
        });
      }
    );
  });

  return (
    <div id="cornerstoneViewer">
      <h2>Viewer Viewing Views</h2>
      {/* The viewer will be rendered here */}
      {imageId && (
        <cornerstone-element elementId={`cornerstoneElement-${imageId}`} />
      )}
    </div>
  );
}

// Use dynamic to load the CornerstoneViewer component
const DynamicCornerstoneViewer = dynamic(
  () => Promise.resolve(CornerstoneViewer),
  {
    ssr: false, // Render on the client-side only
  }
);

export default DynamicCornerstoneViewer;

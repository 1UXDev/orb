import React, { useEffect, useState } from "react";
import cornerstone from "cornerstone-core";
import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import dicomParser from "dicom-parser";
import dynamic from "next/dynamic";
// Use dynamic to load the CornerstoneViewer component

function DicomLocal2() {
  const [imageId, setImageId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // This code will only execute on the client-side

      // Example: Configure the WADO Image Loader
      cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
      cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

      // Example: Load a DICOM image after initialization
      const imageLoader = cornerstoneWADOImageLoader.createImageLoader();
      const url = "/0002.DCM";

      imageLoader.loadImage(url).then((image) => {
        cornerstone.getEnabledElements()[0].image = image;
        setImageId(image.imageId);
      });

      // Example: Configure the viewer's viewport
      const element = document.getElementById("cornerstoneViewer");
      cornerstone.enable(element);
      cornerstone.setViewport(element, { scale: 1 });

      return () => {
        // Cleanup when the component is unmounted
        cornerstone.disable(element);
      };
    }
  }, []);

  return (
    <div id="cornerstoneViewer">
      {/* The viewer will be rendered here */}
      {imageId && (
        <cornerstone-element elementId={`cornerstoneElement-${imageId}`} />
      )}
    </div>
  );
}

export const DynamicDicomLocal2 = dynamic(() => Promise.resolve(DicomLocal2), {
  ssr: false, // Render on the client-side only
});

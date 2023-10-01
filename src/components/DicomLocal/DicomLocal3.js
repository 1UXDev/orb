import React, { useEffect, useRef } from "react";

import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import dynamic from "next/dynamic";

const CornerstoneViewer = dynamic(() => import("cornerstone-core"), {
  ssr: false,
});

function DicomViewer() {
  const dicomFileInputRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Use window-dependent code here

      if (containerRef.current) {
        // Initialize cornerstone and set dependencies
        cornerstoneWADOImageLoader.external.cornerstone = CornerstoneViewer;
        cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

        // Enable Cornerstone on the container
        CornerstoneViewer.enable(containerRef.current);

        return () => {
          // Cleanup Cornerstone when the component unmounts
          CornerstoneViewer.disable(containerRef.current);
        };
      }
    }
  }, []);

  const loadDicomFile = () => {
    if (!dicomFileInputRef.current.files.length) {
      return;
    }

    const dicomFile = dicomFileInputRef.current.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      const dicomData = e.target.result;
      const blob = new Blob([dicomData], { type: "application/dicom" });
      const url = URL.createObjectURL(blob);

      try {
        // Load and display the DICOM image using Cornerstone
        const image = await CornerstoneViewer.loadImage(`wadouri:${url}`);
        CornerstoneViewer.displayImage(containerRef.current, image);

        // Optional: Set initial window center and width
        const viewport = CornerstoneViewer.getViewport(containerRef.current);
        viewport.voi.windowCenter = 100; // Adjust to your preferred values
        viewport.voi.windowWidth = 400; // Adjust to your preferred values
        CornerstoneViewer.setViewport(containerRef.current, viewport);
      } catch (error) {
        console.error("Error loading DICOM image:", error);
      }
    };

    reader.readAsArrayBuffer(dicomFile);
  };

  return (
    <div>
      <input
        type="file"
        id="dicomFile"
        accept=".dcm"
        ref={dicomFileInputRef}
        onChange={loadDicomFile}
      />
      <div ref={containerRef} style={{ width: "512px", height: "512px" }}></div>
    </div>
  );
}

export default DicomViewer;

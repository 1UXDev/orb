import { renderDicomViewer } from "@/utilities/cornerstoneUtils";
import React, { useEffect, useState } from "react";

export default function DicomLocalViewer({ selectedCase, selectedStudy }) {
  const [canvas, setCanvas] = useState(null);
  console.log(selectedCase, selectedStudy);

  useEffect(() => {
    // Define the StaticHTMLComponent to render DICOM images using Cornerstone
    const StaticHTMLComponent = () => {
      const staticHTML = `
        <script src="https://unpkg.com/cornerstone-core@2.3.0/dist/cornerstone.min.js" defer></script>
        <script src="https://unpkg.com/dicom-parser/dist/dicomParser.min.js" defer></script>
        <script src="https://unpkg.com/cornerstone-wado-image-loader@4.13.2/dist/cornerstoneWADOImageLoader.bundle.min.js"defer></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.7.1/jszip.min.js"defer></script>

        <canvas id="dicomCanvas"></canvas>

        function renderDicomViewer() {
          // Set dicomParser as an external dependency for cornerstoneWADOImageLoader
          cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
          cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

          function loadLocalDicomFile(filePath) {
            const localDicomPath = filePath;

            // Load the local DICOM file
            loadDcmFile(localDicomPath);
          }

          function loadDcmFile(dicomPath) {
            // Initialize Cornerstone element
            const canvas = document.getElementById('dicomCanvas');
            cornerstone.enable(canvas);

            // Create a Blob URL to pass to Cornerstone
            const blob = new Blob([dicomPath], { type: 'application/dicom' });
            const url = URL.createObjectURL(blob);

            console.log('DICOM URL:', url);

            cornerstone.loadAndCacheImage('wadouri:' + url).then(function(image) {
              cornerstone.displayImage(canvas, image);
              cornerstone.reset(canvas);
            });
          }

          // Load the DICOM file with selectedCase and selectedStudy as arguments
          loadLocalDicomFile('${selectedCase}/${selectedStudy}.dcm');


      }
      `;

      // Render the canvas element
      return <div dangerouslySetInnerHTML={{ __html: staticHTML }} />;
    };

    // Update the canvas when selectedStudy changes
    setCanvas(<StaticHTMLComponent />);
    renderDicomViewer();
  }, [selectedCase, selectedStudy]);

  return (
    <>
      <h3>test</h3>
      <div>{canvas}</div>
    </>
  );
}

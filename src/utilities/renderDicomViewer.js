import cornerstone from "cornerstone-core";
import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import dicomParser from "dicom-parser";

export default function renderDicomViewer({ selectedCase, selectedStudy }) {
  console.log("renderDicomViewer");
  // Set dicomParser as an external dependency for cornerstoneWADOImageLoader
  cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
  cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

  function loadLocalDicomFile(filePath) {
    const localDicomPath = filePath;
    console.log("filepath ----------_", filePath);

    // Load the local DICOM file
    loadDcmFile(localDicomPath);
  }

  function loadDcmFile(dicomPath) {
    // Initialize Cornerstone element
    const canvas = document.getElementById("dicomCanvas");
    cornerstone.enable(canvas);

    // Create a Blob URL to pass to Cornerstone
    const blob = new Blob([dicomPath], { type: "application/dicom" });
    const url = URL.createObjectURL(blob);

    console.log("DICOM URL:", url);

    cornerstone.loadAndCacheImage("wadouri:" + url).then(function (image) {
      cornerstone.displayImage(canvas, image);
      cornerstone.reset(canvas);
    });
  }

  // Load the DICOM file with selectedCase and selectedStudy as arguments
  loadLocalDicomFile(`${selectedCase}/${selectedStudy}.dcm`);
}

import { parseAndDisplayDicomMetadata } from "@/utilities/parseAndDisplayDicomMetadata";

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (file) {
    parseAndDisplayDicomMetadata(file);
  }
}

// Render a file input for uploading DICOM files
function DicomDataParser() {
  return (
    <div>
      <input type="file" accept=".dcm" onChange={handleFileUpload} />
      <table id="metadataTable">{/* Metadata will be displayed here */}</table>
    </div>
  );
}

export default DicomDataParser;

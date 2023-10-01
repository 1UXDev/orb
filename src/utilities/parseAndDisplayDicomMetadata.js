import dicomParser from "dicom-parser";

export function parseAndDisplayDicomMetadata(file) {
  // Create a FileReader to read the DICOM file
  const reader = new FileReader();

  reader.onload = function (event) {
    try {
      // Get the ArrayBuffer representing the DICOM file
      const arrayBuffer = event.target.result;

      // Create a Uint8Array from the ArrayBuffer
      const byteArray = new Uint8Array(arrayBuffer);

      // Parse the DICOM data
      const dataSet = dicomParser.parseDicom(byteArray);

      // Display metadata in a table (replace "metadataTable" with your table ID or class)
      displayMetadataInTable(dataSet);
    } catch (error) {
      console.error("Error parsing DICOM file:", error);
    }
  };

  // Read the DICOM file as an ArrayBuffer
  reader.readAsArrayBuffer(file);
}

function displayMetadataInTable(dataSet) {
  const metadataTable = document.getElementById("metadataTable");

  // Clear the existing table content
  metadataTable.innerHTML = "";

  // Iterate through DICOM elements and add them to the table
  for (const tag in dataSet.elements) {
    if (dataSet.elements.hasOwnProperty(tag)) {
      const element = dataSet.elements[tag];
      const row = document.createElement("tr");
      const tagCell = document.createElement("td");
      const valueCell = document.createElement("td");

      tagCell.textContent = tag;
      valueCell.textContent = dataSet.string(tag);

      row.appendChild(tagCell);
      row.appendChild(valueCell);

      metadataTable.appendChild(row);
    }
  }
}

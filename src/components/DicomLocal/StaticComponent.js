import React from "react";

const StaticHTMLComponent = () => {
  // Define your static HTML content as a string
  const staticHTML = `
    <script src="https://unpkg.com/cornerstone-core@2.3.0/dist/cornerstone.min.js"></script>
    <script src="https://unpkg.com/dicom-parser/dist/dicomParser.min.js"></script>
    <script src="https://unpkg.com/cornerstone-wado-image-loader@4.13.2/dist/cornerstoneWADOImageLoader.bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.7.1/jszip.min.js"></script>

    <div class="header">
        <h1>MRI/CT scan viewer</h1>
        <h2>Load ZIP with DICOM images</h3>
        <input type="file" id="zipFile" accept=".zip" onchange="loadZipFile()">zip</input>
        <input type="file" id="dcmFile" accept=".dcm" onchange="loadDcmFile()">DCM</input>
    </div>
    <div id="seriesContainers"></div>

    <script>
        // Set dicomParser as an external dependency for cornerstoneWADOImageLoader
        cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
        cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

        function loadZipFile() {
            const zipFileInput = document.getElementById('zipFile');
            const zipFile = zipFileInput.files[0];
            const reader = new FileReader();

            reader.onload = function(e) {
                const zipData = e.target.result;
                JSZip.loadAsync(zipData).then(processZip);
            };

            reader.readAsArrayBuffer(zipFile);
        }

        function loadDcmFile() {
            const dcmFileInput = document.getElementById('dcmFile');
            const dcmFile = dcmFileInput.files[0];
            const reader = new FileReader();

            reader.onload = function(e) {
                const dcmData = e.target.result;
                // JSZip.loadAsync(dcmData).then(processDcm);
                const blob = new Blob([dcmData], { type: 'application/dicom' });
                const url = URL.createObjectURL(blob);
                const image = cornerstone.loadImage('wadouri:' + url)
                cornerstone.displayImage(document.getElementById('seriesContainers'), image);
            };

            reader.readAsArrayBuffer(dcmFile);
        }

        function processZip(zip) {
            const seriesContainers = document.getElementById('seriesContainers');
            seriesContainers.innerHTML = ''; // Clear existing containers

            // Temporary storage for unsorted series data
            const unsortedSeriesData = {};

            // Use promises to handle asynchronous file reading
            const promises = [];

            // Iterate through ZIP entries
            zip.forEach(function(relativePath, zipEntry) {
                // Check if the entry is a file (not a directory)
                if (!zipEntry.dir) {
                    // Extract the series key and filename from the relative path
                    const filepath_arr = relativePath.split('/');
                    const filename = filepath_arr.pop();
                    const serieKey = filepath_arr.pop();

                    // Ensure unsortedSeriesData has an array for this series
                    if (!unsortedSeriesData[serieKey]) unsortedSeriesData[serieKey] = [];

                    // Read the file and store it in the unsortedSeriesData array, along with the filename
                    const promise = zipEntry.async('arraybuffer').then(function(content) {
                        const fileData = { filename, content }
                        unsortedSeriesData[serieKey].push(fileData);
                    });
                    promises.push(promise);
                }
            });

            // Wait for all file reads to complete
            Promise.all(promises).then(async function() {
                // Iterate through series data and create separate containers
                Object.entries(unsortedSeriesData).forEach(([_serieKey, serie]) => {
                    // Sort the series based on filenames
                    serie.sort(function(a, b) {
                        return a.filename.localeCompare(b.filename);
                    });

                    const files = serie.map(slice => slice.content)

                    // Create container and controls for this series
                    createSeriesContainer(files);
                });
            });
        }

        async function createSeriesContainer(files) {
            // Scope variables specific to this series
            let currentSlice = 0;
            let windowCenter = 0;
            let windowWidth = 100;

            // Create a new container for this series
            const containerDiv = document.createElement('div');
            containerDiv.style.width = '512px';
            containerDiv.style.height = '512px';

            const seriesContainers = document.getElementById('seriesContainers');
            seriesContainers.appendChild(containerDiv);

            // Variables for handling window center and "window width" adjustments
            let isLeftMouseDown = false;
            let lastMouseX = 0;
            let lastMouseY = 0;

            // Event listeners for mouse interactions: wheel, mouse down, mouse move, and mouse up

            containerDiv.addEventListener('wheel', function(event) {
                event.preventDefault();
                if (event.deltaY > 0) {
                    changeSlice(-1);
                } else {
                    changeSlice(1);
                }
            });

            containerDiv.addEventListener('mousedown', function(e) {
                if (e.button === 0) { // Left mouse button
                    isLeftMouseDown = true;
                    lastMouseX = e.clientX;
                    lastMouseY = e.clientY;
                }
            });

            containerDiv.addEventListener('mousemove', function(e) {
                if (isLeftMouseDown) {
                    const deltaX = e.clientX - lastMouseX;
                    const deltaY = e.clientY - lastMouseY;

                    // Update "window center" based on vertical mouse movement
                    windowCenter += deltaY;
                    // Ensure "window center" is positive
                    if (windowCenter < 0) windowCenter = 0;

                    // Update "window width" based on horizontal mouse movement
                    windowWidth += deltaX;
                    // Ensure "window width" is positive
                    if (windowWidth < 0) windowWidth = 0;

                    // Apply updated "window center" and "window width"
                    updateViewport(windowCenter, windowWidth);

                    // Save current mouse position for next move event
                    lastMouseX = e.clientX;
                    lastMouseY = e.clientY;

                    cornerstone.resize(containerDiv);

                }
            });

            document.addEventListener('mouseup', function(e) {
                if (e.button === 0) { // Left mouse button
                    isLeftMouseDown = false;
                }
            });

            /**
             * Let's now support mobile devices!
             */

            // Let's add support for moving slices by swiping up/down

            let lastTouchY = 0;
            let lastTouchX = 0;

            containerDiv.addEventListener('touchstart', function(e) {
                lastTouchY = e.touches[0].clientY;
                lastTouchX = e.touches[0].clientX;
            });

            containerDiv.addEventListener('touchmove', function(e) {
                const deltaY = e.touches[0].clientY - lastTouchY;
                const deltaX = e.touches[0].clientX - lastTouchX;

                // Update "currentSlice" based on vertical mouse movement
                changeSlice(-deltaY/15);
                console.log(deltaY/15);

                // Update "window width" based on horizontal mouse movement
                windowWidth += deltaX;
                // Ensure "window width" is positive
                if (windowWidth < 0) windowWidth = 0;

                // Apply updated "window width"
                updateViewport(windowCenter, windowWidth);

                // Save current mouse position for next move event
                lastTouchY = e.touches[0].clientY;
                lastTouchX = e.touches[0].clientX;

                cornerstone.resize(containerDiv);
                e.preventDefault();
            });

            // Let's add support for moving slices by pinching in/out

            let lastPinchDistance = 0;

            containerDiv.addEventListener('touchstart', function(e) {
                if (e.touches.length === 2) {
                    lastPinchDistance = Math.hypot(
                        e.touches[0].clientX - e.touches[1].clientX,
                        e.touches[0].clientY - e.touches[1].clientY
                    );
                }
            });

            containerDiv.addEventListener('touchmove', function(e) {
                if (e.touches.length === 2) {
                    const newPinchDistance = Math.hypot(
                        e.touches[0].clientX - e.touches[1].clientX,
                        e.touches[0].clientY - e.touches[1].clientY
                    );

                    const deltaPinchDistance = newPinchDistance - lastPinchDistance;

                    // Update "window center" based on vertical mouse movement
                    windowCenter -= deltaPinchDistance;
                    // Ensure "window center" is positive
                    if (windowCenter < 0) windowCenter = 0;

                    // Apply updated "window center"
                    updateViewport(windowCenter, windowWidth);

                    lastPinchDistance = newPinchDistance;
                }
            });

            async function renderSlice(sliceIndex) {
                cornerstone.enable(containerDiv);

                // Retrieve DICOM file data for the specified series and slice
                const dicomData = files[sliceIndex]

                // Create a Blob URL to pass to Cornerstone
                const blob = new Blob([dicomData], { type: 'application/dicom' });
                const url = URL.createObjectURL(blob);

                const image = await cornerstone.loadImage('wadouri:' + url)
                cornerstone.displayImage(containerDiv, image);
                cornerstone.reset(containerDiv);

                return image;
            }
    
            // Change slice index and render new slice
            async function changeSlice(delta) {
                const roundedNewSlice = Math.round(currentSlice + delta);
                if (files[roundedNewSlice]) {
                    currentSlice += delta;
                    await renderSlice(roundedNewSlice);
                    updateViewport(windowCenter, windowWidth);
                }
            }
    
            function updateViewport(windowCenter, windowWidth) {
                const viewport = cornerstone.getViewport(containerDiv);
    
                // Update "window center" and "window width"
                viewport.voi.windowCenter = windowCenter;
                viewport.voi.windowWidth = windowWidth;
    
                // Apply updated viewport settings
                cornerstone.setViewport(containerDiv, viewport);
            }

            // Initial render of the series
            const image = await renderSlice(0);

            windowCenter = image.windowCenter || 0; // Default value if not defined
            windowWidth = image.windowWidth || 100; // Default value if not defined

            // Apply initial viewport settings
            updateViewport(windowCenter, windowWidth);
        }

        // Initialize file loading
        loadZipFile();

    </script>

  `;

  return (
    <div>
      {/* Use dangerouslySetInnerHTML to render the static HTML */}
      <div dangerouslySetInnerHTML={{ __html: staticHTML }} />
    </div>
  );
};

export default StaticHTMLComponent;

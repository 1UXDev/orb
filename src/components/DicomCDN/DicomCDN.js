import dicomParser from "dicom-parser";
import cornerstoneTools from "cornerstone-tools";
import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import cornerstone from "cornerstone-core";
import Hammer from "hammerjs";
import cornerstoneMath from "cornerstone-math";

// <script src="https://unpkg.com/hammerjs@2.0.8/hammer.js"></script>
// <script src="https://unpkg.com/dicom-parser@1.8.3/dist/dicomParser.min.js"></script>
// <script src="https://unpkg.com/cornerstone-core"></script>
// <script src="https://unpkg.com/cornerstone-math"></script>
// <script src="https://unpkg.com/cornerstone-wado-image-loader"></script>
// <script src="https://unpkg.com/cornerstone-tools"></script>
// <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>

export default function DicomCDN() {
  cornerstoneTools.external.Hammer = Hammer;
  cornerstoneTools.external.cornerstone = cornerstone;
  cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
  cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
  cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
  cornerstoneTools.init({
    showSVGCursors: true,
  });

  let loaded = false;
  let series = [];

  let imageId1 = [
    "dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.7.dcm",
    "dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.8.dcm",
    "dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.9.dcm",
    "dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.10.dcm",
    "dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.11.dcm",
    "dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.12.dcm",
  ];

  let imageId2 = [
    "dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.9.dcm",
    "dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.10.dcm",
    "dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.11.dcm",
  ];

  const element = document.getElementById("dicomImage");
  cornerstone.enable(element);

  loadAndViewImage(imageId1);

  let thumbnail = [
    document.getElementById("thumbnail1"),
    document.getElementById("thumbnail2"),
    document.getElementById("thumbnail3"),
    document.getElementById("thumbnail4"),
    document.getElementById("thumbnail5"),
  ];

  for (let i = 0; i < thumbnail.length; i++) {
    if (i === 0) {
      handleThumbnail(imageId1, thumbnail[0]);
    } else if (i === 1) {
      handleThumbnail(imageId2, thumbnail[1]);
    } else if (i === 2) {
      handleThumbnail(imageId1, thumbnail[2]);
    } else if (i === 3) {
      handleThumbnail(imageId2, thumbnail[3]);
    } else if (i === 4) {
      handleThumbnail(imageId1, thumbnail[4]);
    }
  }
  for (let i = 0; i < thumbnail.length; i++) {
    if (i === 0) {
      handleThumbnail(imageId1, thumbnail[0]);
    } else if (i === 1) {
      handleThumbnail(imageId2, thumbnail[1]);
    } else if (i === 2) {
      handleThumbnail(imageId1, thumbnail[2]);
    } else if (i === 3) {
      handleThumbnail(imageId2, thumbnail[3]);
    } else if (i === 4) {
      handleThumbnail(imageId1, thumbnail[4]);
    }
  }

  /*Drop down*/
  function dp_menu1() {
    let click = document.getElementById("drop-content1");

    if (click.style.display === "none") {
      click.style.display = "block";
    } else {
      click.style.display = "none";
    }
  }
  function dp_menu2() {
    let click = document.getElementById("drop-content2");

    if (click.style.display === "none") {
      click.style.display = "block";
    } else {
      click.style.display = "none";
    }
  }
  function dp_menu3() {
    let click = document.getElementById("drop-content3");

    if (click.style.display === "none") {
      click.style.display = "block";
    } else {
      click.style.display = "none";
    }
  }
  function dp_menu4() {
    let click = document.getElementById("drop-content4");

    if (click.style.display === "none") {
      click.style.display = "block";
    } else {
      click.style.display = "none";
    }
  }
  /*Load Thumbnail*/
  function handleThumbnail(imageId, thumbnail) {
    const thumnail_img = thumbnail;
    cornerstone.enable(thumnail_img);
    cornerstone
      .loadImage(imageId[0])
      .then(function (image) {
        const viewport = cornerstone.getDefaultViewportForImage(
          thumnail_img,
          image
        );

        cornerstone.displayImage(thumnail_img, image, viewport);
        loaded = true;
      })
      .catch(function (err) {
        alert(err);
      });
  }

  /*Update Cornerstone Image*/
  function updateImage(imageId) {
    cornerstone.disable(element);
    cornerstone.enable(element);
    cornerstone
      .loadImage(imageId)
      .then(function (image) {
        const viewport = cornerstone.getDefaultViewportForImage(element, image);
        cornerstone.displayImage(element, image, viewport);
        loaded = true;

        handleStackScrollMouseWheel(element);
        handleStackScrollTool(element);
      })
      .catch(function (err) {});
  }

  /*Load Cornerstone Image*/
  function loadAndViewImage(imageId) {
    //clean canvas and add new elements.
    cornerstone.disable(element);
    cornerstone.enable(element);
    let imgNum = 0;
    cornerstone
      .loadImage(imageId[imgNum])
      .then(function (image) {
        const viewport = cornerstone.getDefaultViewportForImage(element, image);

        cornerstone.displayImage(element, image, viewport);
        loaded = true;
        series = imageId;

        document.getElementById("bottomleft").textContent =
          "Image #" + imgNum + "/" + (series.length - 1);

        element.onwheel = wheelE;

        function wheelE(e) {
          e.stopPropagation();
          e.preventDefault();
          if (e.wheelDelta < 0 || e.detail > 0) {
            if (imgNum < series.length) {
              if (imgNum !== series.length - 1) {
                imgNum++;
                document.getElementById("bottomleft").textContent =
                  "Image #" + imgNum + "/" + (series.length - 1);
              }
            }
          } else {
            if (imgNum > 0) {
              imgNum--;
              document.getElementById("bottomleft").textContent =
                "Image #" + imgNum + "/" + (series.length - 1);
            } else {
              imgNum = 0;
              document.getElementById("bottomleft").textContent =
                "Image #" + imgNum + "/" + (series.length - 1);
              return false;
            }
          }
          return false;
        }
        document.getElementById("bottomright1").textContent =
          "WW/WC:" +
          `${Math.round(viewport.voi.windowWidth)} / ${Math.round(
            viewport.voi.windowCenter
          )}`;
        document.getElementById("bottomright2").textContent =
          "Zoom:" + `${viewport.scale}` + "x";

        element.addEventListener("mousedown", function (e) {
          let lastX = e.pageX;
          let lastY = e.pageY;
          const mouseButton = e.which;

          function mouseMoveHandler(e) {
            const deltaX = e.pageX - lastX;
            const deltaY = e.pageY - lastY;
            lastX = e.pageX;
            lastY = e.pageY;

            if (mouseButton === 2) {
              let viewport = cornerstone.getViewport(element);
              viewport.voi.windowWidth += deltaX / viewport.scale;
              viewport.voi.windowCenter += deltaY / viewport.scale;
              cornerstone.setViewport(element, viewport);

              document.getElementById("bottomright1").textContent =
                "WW/WC:" +
                Math.round(viewport.voi.windowWidth) +
                "/" +
                Math.round(viewport.voi.windowCenter);
            } else if (mouseButton === 3) {
              let viewport = cornerstone.getViewport(element);
              viewport.scale += deltaY / 100;
              cornerstone.setViewport(element, viewport);
              document.getElementById("bottomright2").textContent =
                "Zoom:" + (viewport.scale + "x");
            }
          }

          function mouseUpHandler() {
            document.removeEventListener("mousemove", mouseMoveHandler);
            document.removeEventListener("mouseup", mouseUpHandler);
          }

          document.addEventListener("mousemove", mouseMoveHandler);
          document.addEventListener("mouseup", mouseUpHandler);
        });
        handleStackScrollMouseWheel(element);
        handleStackScrollTool(element);

        window.onkeydown = function keyE(e) {
          if (e.keyCode === 37) {
            if (imgNum > 0) {
              imgNum--;
              updateImage(series[imgNum]);
              document.getElementById("bottomleft").textContent =
                "Image #" + imgNum + "/" + (series.length - 1);
            }
          } else if (e.keyCode === 38) {
            if (imgNum < series.length) {
              imgNum++;
              updateImage(series[imgNum]);
              document.getElementById("bottomleft").textContent =
                "Image #" + imgNum + "/" + (series.length - 1);
            }
          } else if (e.keyCode === 39) {
            if (imgNum < series.length) {
              imgNum++;
              updateImage(series[imgNum]);
              document.getElementById("bottomleft").textContent =
                "Image #" + imgNum + "/" + (series.length - 1);
            }
          } else if (e.keyCode === 40) {
            if (imgNum > 0) {
              imgNum--;
              updateImage(series[imgNum]);
              document.getElementById("bottomleft").textContent =
                "Image #" + imgNum + "/" + (series.length - 1);
            }
          }
        };

        document
          .getElementById("SoftTissue")
          .addEventListener("click", function () {
            let viewport = cornerstone.getViewport(element);
            viewport.voi.windowWidth = 400;
            viewport.voi.windowCenter = 20;
            cornerstone.setViewport(element, viewport);
            document.getElementById("bottomright1").textContent =
              "WW/WC:" +
              Math.round(viewport.voi.windowWidth) +
              "/" +
              Math.round(viewport.voi.windowCenter);
          });
        document.getElementById("Bone").addEventListener("click", function () {
          let viewport = cornerstone.getViewport(element);
          viewport.voi.windowWidth = 2000;
          viewport.voi.windowCenter = 300;
          cornerstone.setViewport(element, viewport);
          document.getElementById("bottomright1").textContent =
            "WW/WC:" +
            Math.round(viewport.voi.windowWidth) +
            "/" +
            Math.round(viewport.voi.windowCenter);
        });
        document.getElementById("Brain").addEventListener("click", function () {
          let viewport = cornerstone.getViewport(element);
          viewport.voi.windowWidth = 400;
          viewport.voi.windowCenter = 240;
          cornerstone.setViewport(element, viewport);
          document.getElementById("bottomright1").textContent =
            "WW/WC:" +
            Math.round(viewport.voi.windowWidth) +
            "/" +
            Math.round(viewport.voi.windowCenter);
        });
        document
          .getElementById("Stroke")
          .addEventListener("click", function () {
            let viewport = cornerstone.getViewport(element);
            viewport.voi.windowWidth = 1600;
            viewport.voi.windowCenter = -600;
            cornerstone.setViewport(element, viewport);
            document.getElementById("bottomright1").textContent =
              "WW/WC:" +
              Math.round(viewport.voi.windowWidth) +
              "/" +
              Math.round(viewport.voi.windowCenter);
          });
        document.getElementById("Lung").addEventListener("click", function () {
          let viewport = cornerstone.getViewport(element);
          viewport.voi.windowWidth = 358;
          viewport.voi.windowCenter = 240;
          cornerstone.setViewport(element, viewport);
          document.getElementById("bottomright1").textContent =
            "WW/WC:" +
            Math.round(viewport.voi.windowWidth) +
            "/" +
            Math.round(viewport.voi.windowCenter);
        });
        let toggleBool = true;
        document
          .getElementById("toggleOverlay")
          .addEventListener("click", function () {
            if (toggleBool === true) {
              document.getElementById("bottomright1").textContent =
                "WW/WC:" +
                Math.round(viewport.voi.windowWidth) +
                "/" +
                Math.round(viewport.voi.windowCenter);
              document.getElementById("bottomleft").textContent =
                "Image #" + imgNum + "/" + (series.length - 1);
              document.getElementById("bottomright2").textContent =
                "Zoom:" + (viewport.scale + "x");
              toggleBool = false;
            } else {
              document.getElementById("bottomright1").textContent = "";
              document.getElementById("bottomleft").textContent = "";
              document.getElementById("bottomright2").textContent = "";
              toggleBool = true;
            }
          });
        let playBool = true;
        document
          .getElementById("playClip")
          .addEventListener("click", function () {
            if (playBool === true) {
              let frameRate = 10;
              cornerstoneTools.playClip(element, frameRate);
              playBool = false;
            } else {
              cornerstoneTools.stopClip(element);
              playBool = true;
            }
          });

        element.addEventListener("touchstart");
      })
      .catch(function (err) {});
  }

  return (
    <div class="wrapper">
      <div class="Toolbar">
        <div class="dropdown">
          <button class="toolButton" onclick="dp_menu1()">
            <img src="assets/annotation.png" title="Toggle Annotations" />
          </button>
          <div style="display: none;" id="drop-content1">
            <button class="toolButton" onclick="handleBidirectional(this)">
              <img src="./assets/bidirectional.png" title="Bidirectional" />
            </button>
            <button class="toolButton" onclick="handleArrowAnnotate(this)">
              <img src="./assets/arrowAnnotate.png" title="Arrow Annotate" />
            </button>
            <button class="toolButton" onclick="handleEllipticalRoi(this)">
              <img src="./assets/ellipticalROI.png" title="Elliptical ROI" />
            </button>
            <button class="toolButton" onclick="handleRectangleROI(this)">
              <img src="./assets/rectangleROI.png" title="Rectangle ROI" />
            </button>
            <button class="toolButton" onclick="handleFreehand(this)">
              <img src="./assets/freeHand.png" title="FreeHand ROI" />
            </button>
            <button class="toolButton" onclick="handleLength(this)">
              <img src="./assets/length.png" title="Length" />
            </button>
            <button class="toolButton" onclick="handleAngle(this)">
              <img src="./assets/angle.png" title="Angle" />
            </button>
            <button class="toolButton" onclick="handleProbe(this)">
              <img src="./assets/probe.png" title="Probe" />
            </button>
          </div>
        </div>
        <button
          id="stackScrollButton"
          class="toolButton"
          onclick="handleStackScrollMouseWheel(this)"
        >
          <img src="./assets/stack.png" title="Stack" />
        </button>
        <button class="toolButton" id="wwwc" onclick="handleWWWC(this)">
          <img src="assets/wwwc.png" title="WW/WC" />
        </button>
        <div class="dropdown">
          <button class="toolButton" onclick="dp_menu2()">
            <img src="assets/wideButton.png" title="WW/WC" />
          </button>
          <div style="display: none;" id="drop-content2">
            <button class="sliceButton" id="SoftTissue">
              Soft Tissue(1)
            </button>
            <button class="sliceButton" id="Bone">
              Bone(2)
            </button>
            <button class="sliceButton" id="Brain">
              Brain(3)
            </button>
            <button class="sliceButton" id="Stroke">
              Stroke(4)
            </button>
            <button class="sliceButton" id="Lung">
              Lung(5)
            </button>
          </div>
        </div>
        <button class="toolButton" onclick="handleInvert(this)">
          <img src="./assets/invert.png" title="Invert" />
        </button>
        <button class="toolButton" onclick="handleMagnify(this)">
          <img src="./assets/magnify.png" title="Magnify" />
        </button>
        <button class="toolButton" onclick="handleZoom(this)" id="zoom">
          <img src="./assets/zoom.png" title="Zoom" />
        </button>
        <button class="toolButton" onclick="handlePan(this)">
          <img src="./assets/pan.png" title="pan" />
        </button>
        <button class="toolButton" onclick="handleEraser(this)">
          <img src="./assets/eraser.png" title="Eraser" />
        </button>
        <button class="toolButton" onclick="handleReset(this)">
          <img src="./assets/refresh.png" title="Reset" />
        </button>
        <button class="toolButton" onclick="handleInvert(this)">
          <img src="./assets/invert.png" title="Invert" />
        </button>
        <button class="toolButton" id="toggleOverlay">
          <img src="./assets/toggle_overlay.PNG" title="Toggle Overlay" />
        </button>
        <button class="toolButton" id="playClip">
          <img src="./assets/play.png" title="Play Clip" />
        </button>
        <div class="dropdown">
          <button class="toolButton" onclick="dp_menu4()">
            <img src="assets/changeSeriesLayout.png" title="changeLayoutGrid" />
          </button>
          <div style="display: none;" id="drop-content4">
            <button class="sliceButton" id="11">
              1x1
            </button>
            <button class="sliceButton" id="12">
              1x2
            </button>
            <button class="sliceButton" id="21">
              2x1
            </button>
            <button class="sliceButton" id="22">
              2x2
            </button>
          </div>
        </div>
        <button class="toolButton" onclick="handleReferenceLine(this)">
          <img src="./assets/referenceLine.png" title="Reference line" />
        </button>
        <div class="dropdown">
          <button class="toolButton" onclick="dp_menu3()">
            <img src="assets/slice.PNG" title="Sort images by..." />
          </button>
          <div style="display: none;" id="drop-content3">
            <button class="sliceButton" onclick="handleSortPlus(this)">
              Slice location +
            </button>
            <button class="sliceButton" onclick="handleSortMinus(this)">
              Slice location -
            </button>
            <button class="sliceButton" onclick="handleSortPlus(this)">
              Image number +
            </button>
            <button class="sliceButton" onclick="handleSortMinus(this)">
              Image number -
            </button>
          </div>
        </div>
      </div>
      <div class="left">
        <div class="stack-wrapper">
          <button
            id="thumbnail1"
            class="stack"
            onclick="loadAndViewImage(imageId1)"
          ></button>
          <button
            id="thumbnail2"
            class="stack"
            onclick="loadAndViewImage(imageId2)"
          ></button>
          <button
            id="thumbnail3"
            class="stack"
            onclick="loadAndViewImage(imageId1)"
          ></button>
          <button
            id="thumbnail4"
            class="stack"
            onclick="loadAndViewImage(imageId2)"
          ></button>
          <button
            id="thumbnail5"
            class="stack"
            onclick="loadAndViewImage(imageId1)"
          ></button>
        </div>
      </div>

      <div class="right">
        <div class="dicom-wrapper">
          <div id="dicomImage" class="dicom-viewer"></div>
          <div id="bottomleft" class="bottomleft"></div>
          <div id="bottomright" class="bottomright">
            <div id="bottomright1"></div>
            <div id="bottomright2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

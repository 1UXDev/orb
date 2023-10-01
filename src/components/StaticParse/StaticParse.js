import React from "react";

const StaticParse = ({ imageData }) => {
  if (imageData) {
    // when imageData exists, render dynamic content here
    return <div className="container">{/* Your dynamic content here */}</div>;
  }

  // Static stuff
  const staticHTML = `
<div class="container">

    <div id="dropZone" class="container-fluid">

        <br>

        <div id="status" class="alert alert-success">
            <div id="statusText">
                Status: Ready (no file loaded)
            </div>
            <ul id="warnings">

            </ul>
        </div>

        <div class="panel panel-default ">
            <div class="panel-heading">
                <h3 class="panel-title">Patient Information</h3>
            </div>
            <div class="panel-body">
                <div class="row">
                    <div class="col-xs-6">
                        Patient Name: <span data-dicom="x00100010"></span>
                    </div>
                    <div class="col-xs-6">
                        Patient ID: <span data-dicom="x00100020"></span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-6">
                        Patient Birth Date: <span data-dicom="x00100030"></span>
                    </div>
                    <div class="col-xs-6">
                        Patient Sex: <span data-dicom="x00100040"></span>
                    </div>
                </div>
            </div>
        </div>

        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">Study Information</h3>
            </div>
            <div class="panel-body">
                <div class="row">
                    <div class="col-xs-6">
                        Study Description: <span data-dicom="x00081030"></span>
                    </div>
                    <div class="col-xs-6">
                        Protocol Name: <span data-dicom="x00181030"></span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-6">
                        Accession #: <span data-dicom="x00080050"></span>
                    </div>
                    <div class="col-xs-6">
                        Study Id: <span data-dicom="x00200010"></span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-6">
                        Study Date: <span data-dicom="x00080020"></span>
                    </div>
                    <div class="col-xs-6">
                        Study Time: <span data-dicom="x00080030"></span>
                    </div>
                </div>

            </div>
        </div>

        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">Series Information</h3>
            </div>
            <div class="panel-body">
                <div class="row">
                    <div class="col-xs-6">
                        Series Description: <span data-dicom="x0008103e"></span>
                    </div>
                    <div class="col-xs-6">
                        Series #: <span data-dicom="x00200011"></span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-6">
                        Modality: <span data-dicom="x00080060"></span>
                    </div>
                    <div class="col-xs-6">
                        Body Part: <span data-dicom="x00180015"></span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-6">
                        Series Date: <span data-dicom="x00080021"></span>
                    </div>
                    <div class="col-xs-6">
                        Series Time: <span data-dicom="x00080031"></span>
                    </div>
                </div>

            </div>
        </div>

        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">Instance Information</h3>
            </div>
            <div class="panel-body">
                <div class="row">
                    <div class="col-xs-6">
                        Instance #: <span data-dicom="x00200013"></span>
                    </div>
                    <div class="col-xs-6">
                        Acquisition #: <span data-dicom="x00200012"></span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-6">
                        Acquisition Date: <span data-dicom="x00080022"></span>
                    </div>
                    <div class="col-xs-6">
                        Acquisition Time: <span data-dicom="x00080032"></span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-6">
                        Content Date: <span data-dicom="x00080023"></span>
                    </div>
                    <div class="col-xs-6">
                        Content Time: <span data-dicom="x00080033"></span>
                    </div>
                </div>



            </div>
        </div>

        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">Image Information</h3>
            </div>
            <div class="panel-body">
                <div class="row">
                    <div class="col-xs-6">
                        Rows: <span data-dicomUint="x00280010"></span>
                    </div>
                    <div class="col-xs-6">
                        Columns: <span data-dicomUint="x00280011"></span>
                    </div>
                </div>

                <div class="row">
                    <div class="col-xs-6">
                        Photometric Interpretation: <span data-dicom="x00280004"></span>
                    </div>
                    <div class="col-xs-6">
                        Image Type: <span data-dicom="x00080008"></span>
                    </div>

                </div>

                <div class="row">
                    <div class="col-xs-6">
                        Bits Allocated: <span data-dicomUint="x00280100"></span>
                    </div>
                    <div class="col-xs-6">
                        Bits Stored: <span data-dicomUint="x00280101"></span>
                    </div>
                </div>

                <div class="row">
                    <div class="col-xs-6">
                        HighBit: <span data-dicomUint="x00280102"></span>
                    </div>
                    <div class="col-xs-6">
                        Pixel Representation (0=us): <span data-dicomUint="x00280103"></span>
                    </div>
                </div>

                <div class="row">
                    <div class="col-xs-6">
                        Rescale Slope: <span data-dicom="x00281053"></span>
                    </div>
                    <div class="col-xs-6">
                        Rescale Intercept: <span data-dicom="x00281052"></span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-6">
                        Image Position Patient: <span data-dicom="x00200032"></span>
                    </div>
                    <div class="col-xs-6">
                        Image Orientation Patient: <span data-dicom="x00200037"></span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-6">
                        Pixel Spacing: <span data-dicom="x00280030"></span>
                    </div>
                    <div class="col-xs-6">
                        Samples Per Pixel: <span data-dicomUint="x00280002"></span>
                    </div>
                </div>

            </div>
        </div>

        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">Equipment Information</h3>
            </div>
            <div class="panel-body">
                <div class="row">
                    <div class="col-xs-6">
                        Manufacturer: <span data-dicom="x00080070"></span>
                    </div>
                    <div class="col-xs-6">
                        Model: <span data-dicom="x00081090"></span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-6">
                        Station Name: <span data-dicom="x00081010"></span>
                    </div>
                    <div class="col-xs-6">
                        AE Title: <span data-dicom="x00020016"></span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12">
                        Institution Name: <span data-dicom="x00080080"></span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12">
                        Software Version: <span data-dicom="x00181020"></span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12">
                        Implementation Version Name: <span data-dicom="x00020013"></span>
                    </div>
                </div>
            </div>
        </div>

        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">UIDS</h3>
            </div>
            <div class="panel-body">
                <div class="row">
                    <div class="col-xs-12">
                        Study UID: <span data-dicom="x0020000d"></span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12">
                        Series UID: <span data-dicom="x0020000e"></span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12">
                        Instance UID: <span data-dicom="x00080018"></span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12">
                        SOP Class UID: <span data-dicom="x00080016"></span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12">
                        Transfer Syntax UID: <span data-dicom="x00020010"></span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12">
                        Frame of Reference UID: <span data-dicom="x00200052"></span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12">
                        WADO URL:
                        <div style="overflow:auto">
                            <span>http://localhost:3333/wado?requestType=WADO&studyUID=</span><span data-dicom="x0020000d"></span><span>&seriesUID=</span><span data-dicom="x0020000e"></span><span>&objectUID=</span><span data-dicom="x00080018"></span><span>&contentType=application%2Fdicom&transferSyntax=1.2.840.10008.1.2.1</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

</div>
</body>

<!-- include the dicomParser library -->
<script src="../../dist/dicomParser.js"></script>
<script>window.dicomParser || document.write('<script src="https://unpkg.com/dicom-parser">\x3C/script>')</script>

<!-- jquery - included to make things easier to demo, not needed by dicomParser -->
<script src="../jquery.min.js"></script>

<script>

    function dumpDataSet(dataSet)
    {
        $('span[data-dicom]').each(function(index, value)
        {
            var attr = $(value).attr('data-dicom');
            var element = dataSet.elements[attr];
            var text = "";
            if(element !== undefined)
            {
                var str = dataSet.string(attr);
                if(str !== undefined) {
                    text = str;
                }
            }
            $(value).text(text);
        });

        $('span[data-dicomUint]').each(function(index, value)
        {
            var attr = $(value).attr('data-dicomUint');
            var element = dataSet.elements[attr];
            var text = "";
            if(element !== undefined)
            {
                if(element.length === 2)
                {
                    text += dataSet.uint16(attr);
                }
                else if(element.length === 4)
                {
                    text += dataSet.uint32(attr);
                }
            }

            $(value).text(text);
        });

    }

    // This function will read the file into memory and then start dumping it
    function dumpFile(file)
    {
        $('#status').removeClass('alert-warning alert-success alert-danger').addClass('alert-info');
        $('#warnings').empty();
        document.getElementById('statusText').innerHTML = 'Status: Loading file, please wait..';

        var reader = new FileReader();
        reader.onload = function(file) {
            var arrayBuffer = reader.result;

            // Here we have the file data as an ArrayBuffer.  dicomParser requires as input a
            // Uint8Array so we create that here
            var byteArray = new Uint8Array(arrayBuffer);

            var kb = byteArray.length / 1024;
            var mb = kb / 1024;
            var byteStr = mb > 1 ? mb.toFixed(3) + " MB" : kb.toFixed(0) + " KB";
            document.getElementById('statusText').innerHTML = '<span class="glyphicon glyphicon-cog"></span>Status: Parsing ' + byteStr + ' bytes, please wait..';

            // set a short timeout to do the parse so the DOM has time to update itself with the above message
            setTimeout(function() {

                var dataSet;
                // Invoke the paresDicom function and get back a DataSet object with the contents
                try {
                    var start = new Date().getTime();

                    dataSet = dicomParser.parseDicom(byteArray);
                    // Here we call dumpDataSet to update the DOM with the contents of the dataSet
                    dumpDataSet(dataSet);

                    var end = new Date().getTime();
                    var time = end - start;
                    if(dataSet.warnings.length > 0)
                    {
                        $('#status').removeClass('alert-success alert-info alert-danger').addClass('alert-warning');
                        $('#statusText').html('Status: Warnings encountered while parsing file (file of size '+ byteStr + ' parsed in ' + time + 'ms)');

                        dataSet.warnings.forEach(function(warning) {
                            $("#warnings").append('<li>' + warning +'</li>');
                        });
                    }
                    else
                    {
                        var pixelData = dataSet.elements.x7fe00010;
                        if(pixelData) {
                            $('#status').removeClass('alert-warning alert-info alert-danger').addClass('alert-success');
                            $('#statusText').html('Status: Ready (file of size '+ byteStr + ' parsed in ' + time + 'ms)');
                        }
                        else
                        {
                            $('#status').removeClass('alert-warning alert-info alert-danger').addClass('alert-success');
                            $('#statusText').html('Status: Ready - no pixel data found (file of size ' + byteStr + ' parsed in ' + time + 'ms)');
                        }
                    }
                }
                catch(err)
                {
                    $('#status').removeClass('alert-success alert-info alert-warning').addClass('alert-danger');
                    document.getElementById('statusText').innerHTML = 'Status: Error - ' + err + ' (file of size ' + byteStr + ' )';
                }

            }, 30);
        };

        reader.readAsArrayBuffer(file);
    }


    // this function gets called once the user drops the file onto the div
    function handleFileSelect(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        // Get the FileList object that contains the list of files that were dropped
        var files = evt.dataTransfer.files;

        // this UI is only built for a single file so just dump the first one
        dumpFile(files[0]);
    }

    function handleDragOver(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    }

    // Setup the dnd listeners.
    var dropZone = document.getElementById('dropZone');
    dropZone.addEventListener('dragover', handleDragOver, false);
    dropZone.addEventListener('drop', handleFileSelect, false);


</script>
`;

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: staticHTML }} />
    </div>
  );
};

export default StaticParse;

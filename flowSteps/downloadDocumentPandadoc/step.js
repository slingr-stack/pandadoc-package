/**
 * This flow step will send generic request.
 *
 * @param {object} inputs
 */
step.downloadDocumentPandadoc = function (inputs) {

  var inputs = {
    download: true,
    fileName: inputs.fileName || "file",
    fileId: inputs.fileId || ""
  };


  var options = {
    path: "/documents/" + inputs.fileId + "/download",
    forceDownload : true,
    downloadSync : true,
    fileName: inputs.fileName
  }

  return endpoint._get(options);
}

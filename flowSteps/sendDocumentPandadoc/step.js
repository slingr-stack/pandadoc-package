/**
 * This flow step will send generic request.
 *
 * @param {object} inputs
 */
step.sendDocumentPandadoc = function (inputs) {

  var inputs = {
    fileId: inputs.fileId || "",
    subject: inputs.subject || "",
    message: inputs.message || "",
    silent: inputs.silent || false
  };

  var body  = {
    subject: inputs.subject,
    message: inputs.message,
    silent: inputs.silent
  }


  var options = {
    path: "/documents/"+ inputs.fileId + "/send",
    body: body
  }


  return endpoint._post(options);
}

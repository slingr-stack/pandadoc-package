/**
 * This flow step will send generic request.
 *
 * @param {object} inputs
 */
step.listDocumentsPandadoc = function (inputs) {

  var options = {
    path: "/documents"
  }

  return endpoint._get(options);
}

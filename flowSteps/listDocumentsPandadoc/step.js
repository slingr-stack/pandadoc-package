/****************************************************
 Dependencies
 ****************************************************/

var httpService = dependencies.http;

/**
 * This flow step will send generic request.
 *
 * @param {object} inputs
 */
step.listDocumentsPandadoc = function (inputs) {

  var options = {
    path: "/documents"
  }

  return httpService.get(options);
}

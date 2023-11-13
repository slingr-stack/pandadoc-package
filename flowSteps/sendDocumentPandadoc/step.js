/****************************************************
 Dependencies
 ****************************************************/

var httpService = dependencies.http;

/**
 * This flow step will send generic request.
 *
 * @param {object} inputs
 */
step.sendDocumentPandadoc = function (inputs) {

  var inputsLogic = {
    fileId: inputs.fileId || "",
    subject: inputs.subject || "",
    message: inputs.message || "",
    silent: inputs.silent || false
  };

  var body  = {
    subject: inputsLogic.subject,
    message: inputsLogic.message,
    silent: inputsLogic.silent
  }


  var options = {
    path: "/documents/"+ inputsLogic.fileId + "/send",
    body: body
  }

  options= setApiUri(options);
  options= setRequestHeaders(options);

  return httpService.post(options);
};

function setApiUri(options) {
  var url = options.path || "";
  options.url = config.get("PANDADOC_API_BASE_URL") + url;
  sys.logs.debug('[pandadoc] Set url: ' + options.path + "->" + options.url);
  return options;
}

function setRequestHeaders(options) {
  var headers = options.headers || {};
  if (config.get("authenticationMethod") === "apiKey") {
    sys.logs.debug('[pandadoc] Set header apikey');
    headers = mergeJSON(headers, {"Authorization": "API-Key " + config.get("apiKey")});
  } else {
    sys.logs.debug('[pandadoc] Set header Bearer');
    headers = mergeJSON(headers, {"Authorization": "Bearer " + config.get("accessToken")});
  }
  headers = mergeJSON(headers, {"Content-Type": "application/json"});
  if (headers.Accept === undefined) {
    sys.logs.debug('[pandadoc] Set header accept');
    headers = mergeJSON(headers, "Accept", "application/json");
  }
  options.headers = headers;
  return options;
}

function mergeJSON (json1, json2) {
  var result = {};
  var key;
  for (key in json1) {
    if(json1.hasOwnProperty(key)) result[key] = json1[key];
  }
  for (key in json2) {
    if(json2.hasOwnProperty(key)) result[key] = json2[key];
  }
  return result;
}

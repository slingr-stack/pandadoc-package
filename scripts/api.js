/****************************************************
 Constants
 ****************************************************/

var PANDADOC_API_BASE_URL = "https://api.pandadoc.com";
var PANDADOC_API_URL = PANDADOC_API_BASE_URL+"/public/v1";

/****************************************************
 Public API
 ****************************************************/

exports.PandaDoc = function (options) {
    options = options || {};
    options= setApiUri(options);
    options= setRequestHeaders(options);
    return options;
}

/****************************************************
 Private API
 ****************************************************/

function setApiUri(options) {
    var url = options.url || {};
    options.url = PANDADOC_API_URL + url;
    return options;
}

function setRequestHeaders(options) {
    var headers = options.headers || {};
    if (config.get("authenticationMethod") === "apiKey") {
        headers = mergeJSON(headers, {"Authorization": "API-Key " + config.get("apiKey")});
    } else {
        headers = mergeJSON(headers, {"Authorization": "Bearer " + config.get("accessToken")});
    }
    headers = mergeJSON(headers, {"Content-Type": "application/json"});
    if (headers.Accept === undefined) {
        headers = mergeJSON(headers, "Accept", "application/json");
    }
    options.headers = headers;
    return options;
}

function mergeJSON (json1, json2) {
    const result = {};
    var key;
    for (key in json1) {
        if(json1.hasOwnProperty(key)) result[key] = json1[key];
    }
    for (key in json2) {
        if(json2.hasOwnProperty(key)) result[key] = json2[key];
    }
    return result;
}
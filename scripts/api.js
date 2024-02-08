/****************************************************
 Dependencies
 ****************************************************/

let httpReference = dependencies.http;

let httpDependency = {
    get: httpReference.get,
    post: httpReference.post,
    put: httpReference.put,
    patch: httpReference.patch,
    delete: httpReference.delete,
    head: httpReference.head,
    options: httpReference.options
};

let httpService = {};

/**
 *
 * Handles a request with retry from the platform side.
 */
function handleRequestWithRetry(requestFn, options, callbackData, callbacks) {
    try {
        return requestFn(options, callbackData, callbacks);
    } catch (error) {
        sys.logs.info("[pandadoc] Handling request "+ JSON.stringify(error));
    }
}

function createWrapperFunction(requestFn) {
    return function(options, callbackData, callbacks) {
        return handleRequestWithRetry(requestFn, options, callbackData, callbacks);
    };
}

for (let key in httpDependency) {
    if (typeof httpDependency[key] === 'function') httpService[key] = createWrapperFunction(httpDependency[key]);
}

/****************************************************
 Helpers
 ****************************************************/

exports.documents = {};

exports.documents.session = {};

exports.documents.download = {};

exports.documents.post = function(fileId, httpOptions) {
    if(!httpOptions){
        for (var i = 0 ; i < arguments.length; i++){
            if (isObject(arguments[i])){
                httpOptions = arguments[i];
            }
        }
    }
    let url;
    switch(arguments.length){
        case 1:
            url = parse('/documents');
            break;
        case 2:
            return httpService.post({
                path: '/documents',
                settings: {
                    multipart: true,
                    parts: [
                        {
                            name: 'file',
                            type: 'file',
                            fileId: fileId
                        },
                        {
                            name: 'data',
                            type: 'other',
                            contentType: 'application/json',
                            content: httpOptions
                        }
                    ]
                }
            });
        default:
            sys.logs.error('Invalid argument received.');
            return;
    }
    sys.logs.debug('[pandadoc] POST from: ' + url);
    let options = checkHttpOptions(url, httpOptions);
    return httpService.post(PandaDoc(options));
};

exports.documents.session.post = function(documentId, httpOptions) {
    if (!documentId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [documentId].');
        return;
    }
    let url = parse('/documents/:documentId/session', [documentId]);
    sys.logs.debug('[pandadoc] POST from: ' + url);
    let options = checkHttpOptions(url, httpOptions);
    let res = httpService.post(PandaDoc(options));
    res.link = 'https://app.pandadoc.com/s/'+res.id;
    return res;
};

exports.documents.download.get = function(documentId, httpOptions) {
    if (!documentId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [documentId].');
        return;
    }
    let url = parse('/documents/:documentId/download', [documentId]);
    sys.logs.debug('[pandadoc] GET from: ' + url);

    httpOptions = {
        path:url,
        settings: {
            forceDownload: true,
            downloadSync: true,
            fileName: 'document.pdf'
        }
    };

    let options = checkHttpOptions(url, httpOptions);
    return httpService.get(PandaDoc(options));
};

/****************************************************
 Public API - Generic Functions
 ****************************************************/

/**
 * Sends an HTTP GET request to the specified URL with the provided HTTP options.
 *
 * @param {string} path         - The path to send the GET request to.
 * @param {object} httpOptions  - The options to be included in the GET request check http-service documentation.
 * @param {object} callbackData - Additional data to be passed to the callback functions. [optional]
 * @param {object} callbacks    - The callback functions to be called upon completion of the GET request. [optional]
 * @return {object}             - The response of the GET request.
 */
exports.get = function(path, httpOptions, callbackData, callbacks) {
    let options = checkHttpOptions(path, httpOptions);
    return httpService.get(PandaDoc(options), callbackData, callbacks);
};

/**
 * Sends an HTTP POST request to the specified URL with the provided HTTP options.
 *
 * @param {string} path         - The path to send the POST request to.
 * @param {object} httpOptions  - The options to be included in the POST request check http-service documentation.
 * @param {object} callbackData - Additional data to be passed to the callback functions. [optional]
 * @param {object} callbacks    - The callback functions to be called upon completion of the POST request. [optional]
 * @return {object}             - The response of the POST request.
 */
exports.post = function(path, httpOptions, callbackData, callbacks) {
    let options = checkHttpOptions(path, httpOptions);
    return httpService.post(PandaDoc(options), callbackData, callbacks);
};

/**
 * Sends an HTTP PUT request to the specified URL with the provided HTTP options.
 *
 * @param {string} path         - The path to send the PUT request to.
 * @param {object} httpOptions  - The options to be included in the PUT request check http-service documentation.
 * @param {object} callbackData - Additional data to be passed to the callback functions. [optional]
 * @param {object} callbacks    - The callback functions to be called upon completion of the POST request. [optional]
 * @return {object}             - The response of the PUT request.
 */
exports.put = function(path, httpOptions, callbackData, callbacks) {
    let options = checkHttpOptions(path, httpOptions);
    return httpService.put(PandaDoc(options), callbackData, callbacks);
};

/**
 * Sends an HTTP PATCH request to the specified URL with the provided HTTP options.
 *
 * @param {string} path         - The path to send the PATCH request to.
 * @param {object} httpOptions  - The options to be included in the PATCH request check http-service documentation.
 * @param {object} callbackData - Additional data to be passed to the callback functions. [optional]
 * @param {object} callbacks    - The callback functions to be called upon completion of the POST request. [optional]
 * @return {object}             - The response of the PATCH request.
 */
exports.patch = function(path, httpOptions, callbackData, callbacks) {
    let options = checkHttpOptions(path, httpOptions);
    return httpService.patch(PandaDoc(options), callbackData, callbacks);
};

/**
 * Sends an HTTP DELETE request to the specified URL with the provided HTTP options.
 *
 * @param {string} path         - The path to send the DELETE request to.
 * @param {object} httpOptions  - The options to be included in the DELETE request check http-service documentation.
 * @param {object} callbackData - Additional data to be passed to the callback functions. [optional]
 * @param {object} callbacks    - The callback functions to be called upon completion of the DELETE request. [optional]
 * @return {object}             - The response of the DELETE request.
 */
exports.delete = function(path, httpOptions, callbackData, callbacks) {
    let options = checkHttpOptions(path, httpOptions);
    return httpService.delete(PandaDoc(options), callbackData, callbacks);
};

/**
 * Sends an HTTP HEAD request to the specified URL with the provided HTTP options.
 *
 * @param {string} path         - The path to send the HEAD request to.
 * @param {object} httpOptions  - The options to be included in the HEAD request check http-service documentation.
 * @param {object} callbackData - Additional data to be passed to the callback functions. [optional]
 * @param {object} callbacks    - The callback functions to be called upon completion of the HEAD request. [optional]
 * @return {object}             - The response of the HEAD request.
 */
exports.head = function(path, httpOptions, callbackData, callbacks) {
    let options = checkHttpOptions(path, httpOptions);
    return httpService.head(PandaDoc(options), callbackData, callbacks);
};

/**
 * Sends an HTTP OPTIONS request to the specified URL with the provided HTTP options.
 *
 * @param {string} path         - The path to send the OPTIONS request to.
 * @param {object} httpOptions  - The options to be included in the OPTIONS request check http-service documentation.
 * @param {object} callbackData - Additional data to be passed to the callback functions. [optional]
 * @param {object} callbacks    - The callback functions to be called upon completion of the OPTIONS request. [optional]
 * @return {object}             - The response of the OPTIONS request.
 */
exports.options = function(path, httpOptions, callbackData, callbacks) {
    let options = checkHttpOptions(path, httpOptions);
    return httpService.options(PandaDoc(options), callbackData, callbacks);
};

exports.utils = {

    /**
     * Converts a given date to a timestamp.
     *
     * @param {number | string} params      - The date to be converted.
     * @return {object}                     - An object containing the timestamp.
     */
    fromDateToTimestamp: function(params) {
        if (!!params) {
            return {timestamp: new Date(params).getTime()};
        }
        return null;
    },

    /**
     * Converts a timestamp to a date object.
     *
     * @param {number} timestamp            - The timestamp to convert.
     * @return {object}                     - The date object representing the timestamp.
     */
    fromTimestampToDate: function(timestamp) {
        return new Date(timestamp);
    },

    /**
     * Gets a configuration from the properties.
     *
     * @param {string} property             - The name of the property to get.
     *                                          If it is empty, return the entire configuration object.
     * @return {string}                     - The value of the property or the whole object as string.
     */
    getConfiguration: function (property) {
        if (!property) {
            sys.logs.debug('[pandaDoc] Get configuration');
            return JSON.stringify(config.get());
        }
        sys.logs.debug('[pandaDoc] Get property: '+property);
        return config.get(property);
    },

    /**
     * Concatenates a path with a param query and its value.
     *
     * @param path                          - The path to concatenate.
     * @param key                           - The name of the param.
     * @param value                         - The value of the param.
     * @returns {string}                    - The concatenated path without coding parameters.
     */
    concatQuery: function (path, key, value) {
        return path + ((!path || path.indexOf('?') < 0) ? '?' : '&') + key + "=" + value;
    },

    /**
     * Merges two JSON objects into a single object.
     *
     * @param {Object} json1 - The first JSON object to be merged.
     * @param {Object} json2 - The second JSON object to be merged.
     * @return {Object} - The merged JSON object.
     */
    mergeJSON: mergeJSON,
};

exports.utils.verifySignature = function (body, signature) {
    let secret = config.get("webhooksSharedKey");
    if (!secret || secret === "" || !sys.utils.crypto.verifySignatureWithHmac(body, signature, secret, "HmacSHA256")) {
        sys.logs.error("Invalid signature or body");
        return false;
    }
    return true;
};

/****************************************************
 Private helpers
 ****************************************************/

function checkHttpOptions (path, options) {
    options = options || {};
    if (!!path) {
        if (isObject(path)) {
            // take the 'path' parameter as the options
            options = path || {};
        } else {
            if (!!options.path || !!options.params || !!options.body) {
                // options contain the http package format
                options.path = path;
            } else {
                // create html package
                options = {
                    path: path,
                    body: options
                }
            }
        }
    }
    return options;
}

function isObject (obj) {
    return !!obj && stringType(obj) === '[object Object]'
}

let stringType = Function.prototype.call.bind(Object.prototype.toString)

function parse (url, pathVariables){
    let regex = /{([^}]*)}/g;
    if (!url.match(regex)){
        return url;
    }
    if(!pathVariables){
        sys.logs.error('No path variables have been received and the url contains curly brackets\'{}\'');
        throw new Error('Error please contact support.');
    }
    url = url.replace(regex, function(m, i) {
        return pathVariables[i] ? pathVariables[i] : m;
    })
    return url;
}

/****************************************************
 Configurator
 ****************************************************/

let PandaDoc = function (options) {
    options = options || {};
    options= setApiUri(options);
    options= setRequestHeaders(options);
    return options;
}

/****************************************************
 Private API
 ****************************************************/

function setApiUri(options) {
    let url = options.path || "";
    options.url = config.get("PANDADOC_API_BASE_URL") + url;
    sys.logs.debug('[pandadoc] Set url: ' + options.path + "->" + options.url);
    return options;
}

function setRequestHeaders(options) {
    let headers = options.headers || {};
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
    const result = {};
    let key;
    for (key in json1) {
        if(json1.hasOwnProperty(key)) result[key] = json1[key];
    }
    for (key in json2) {
        if(json2.hasOwnProperty(key)) result[key] = json2[key];
    }
    return result;
}

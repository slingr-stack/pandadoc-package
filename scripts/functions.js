/****************************************************
 Dependencies
 ****************************************************/

var httpReference = svc.http;

var httpDependency = {
    get: httpReference.get,
    post: httpReference.post,
    put: httpReference.put,
    patch: httpReference.patch,
    delete: httpReference.delete,
    head: httpReference.head,
    options: httpReference.options
};
var httpService = {};

function handleRequestWithRetry(requestFn, options, callbackData, callbacks) {
    try {
        return requestFn(options, callbackData, callbacks);
    } catch (error) {
        sys.logs.error(JSON.stringify(error));
        sys.logs.info("[pandadoc] Handling request...");
    }
}

function createWrapperFunction(requestFn) {
    return function(options, callbackData, callbacks) {
        return handleRequestWithRetry(requestFn, options, callbackData, callbacks);
    };
}

for (var key in httpDependency) {
    if (typeof httpDependency[key] === 'function') httpService[key] = createWrapperFunction(httpDependency[key]);
}

/****************************************************
 Helpers
 ****************************************************/

exports.documents = {};

exports.documents.details = {};

exports.documents.send = {};

exports.documents.session = {};

exports.documents.download = {};

exports.templates = {};

exports.templates.details = {};

exports.documents.get = function(documentId, httpOptions) {
    if(!httpOptions){
        for (var i = 0 ; i < arguments.length; i++){
            if (isObject(arguments[i])){
                httpOptions = arguments[i];
                arguments[i] = undefined;
            }
        }
    }
    var url;
    switch(httpOptions ? arguments.length - 1 : arguments.length){
        case 0:
            url = parse('/documents');
            break;
        case 1:
            url = parse('/documents/:documentId', [documentId]);
            break;
        default:
            sys.logs.error('Invalid argument received.');
            return;
    }
    sys.logs.debug('[pandadoc] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.get(PandaDoc(options));
};

exports.documents.post = function(fileId, httpOptions) {
    if(!httpOptions){
        for (var i = 0 ; i < arguments.length; i++){
            if (isObject(arguments[i])){
                httpOptions = arguments[i];
            }
        }
    }
    var url;
    switch(arguments.length){
        case 1:
            url = parse('/documents');
            break;
        case 2:
            return httpService.post({
                path: '/documents',
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
            });
        default:
            sys.logs.error('Invalid argument received.');
            return;
    }
    sys.logs.debug('[pandadoc] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(PandaDoc(options));
};

exports.documents.details.get = function(documentId, httpOptions) {
    if (!documentId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [documentId].');
        return;
    }
    var url = parse('/documents/:documentId/details', [documentId]);
    sys.logs.debug('[pandadoc] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.get(PandaDoc(options));
};

exports.documents.send.post = function(documentId, httpOptions) {
    if (!documentId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [documentId].');
        return;
    }
    var url = parse('/documents/:documentId/send', [documentId]);
    sys.logs.debug('[pandadoc] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(PandaDoc(options));
};

exports.documents.session.post = function(documentId, httpOptions) {
    if (!documentId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [documentId].');
        return;
    }
    var url = parse('/documents/:documentId/session', [documentId]);
    sys.logs.debug('[pandadoc] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    var res = httpService.post(PandaDoc(options));
    res.link = 'https://app.pandadoc.com/s/'+res.id;
    return res;
};

exports.documents.download.get = function(documentId, httpOptions) {
    if (!documentId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [documentId].');
        return;
    }
    var url = parse('/documents/:documentId/download', [documentId]);
    sys.logs.debug('[pandadoc] GET from: ' + url);

    httpOptions = {
        path:url,
        forceDownload: true,
        downloadSync: true,
        fileName: 'document.pdf'
    };

    var options = checkHttpOptions(url, httpOptions);
    return httpService.get(PandaDoc(options));
};

exports.templates.get = function(httpOptions) {
    var url = parse('/templates');
    sys.logs.debug('[pandadoc] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.get(PandaDoc(options));
};

exports.templates.details.get = function(templateId, httpOptions) {
    if (!templateId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [templateId].');
        return;
    }
    var url = parse('/templates/:templateId/details', [templateId]);
    sys.logs.debug('[pandadoc] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.get(PandaDoc(options));
};

/****************************************************
 Public API - Generic Functions
 ****************************************************/

exports.get = function(url, httpOptions, callbackData, callbacks) {
    var options = checkHttpOptions(url, httpOptions);
    return httpService.get(PandaDoc(options), callbackData, callbacks);
};

exports.post = function(url, httpOptions, callbackData, callbacks) {
    options = checkHttpOptions(url, httpOptions);
    return httpService.post(PandaDoc(options), callbackData, callbacks);
};

exports.put = function(url, httpOptions, callbackData, callbacks) {
    options = checkHttpOptions(url, httpOptions);
    return httpService.put(PandaDoc(options), callbackData, callbacks);
};

exports.patch = function(url, httpOptions, callbackData, callbacks) {
    options = checkHttpOptions(url, httpOptions);
    return httpService.patch(PandaDoc(options), callbackData, callbacks);
};

exports.delete = function(url, httpOptions, callbackData, callbacks) {
    var options = checkHttpOptions(url, httpOptions);
    return httpService.delete(PandaDoc(options), callbackData, callbacks);
};

exports.head = function(url, httpOptions, callbackData, callbacks) {
    var options = checkHttpOptions(url, httpOptions);
    return httpService.head(PandaDoc(options), callbackData, callbacks);
};

exports.options = function(url, httpOptions, callbackData, callbacks) {
    var options = checkHttpOptions(url, httpOptions);
    return httpService.options(PandaDoc(options), callbackData, callbacks);
};

exports.utils = {};

exports.utils.parseTimestamp = function(dateString) {
    if (!dateString) {
        return null;
    }
    var dt = dateString.split(/[: T\-]/).map(parseFloat);
    return new Date(dt[0], dt[1] - 1, dt[2], dt[3] || 0, dt[4] || 0, dt[5] || 0, 0);
};

exports.utils.formatTimestamp = function(date) {
    if (!date) {
        return null;
    }
    var pad = function(number) {
        var r = String(number);
        if ( r.length === 1 ) {
            r = '0' + r;
        }
        return r;
    };
    return date.getUTCFullYear()
        + '-' + pad( date.getUTCMonth() + 1 )
        + '-' + pad( date.getUTCDate() )
        + 'T' + pad( date.getUTCHours() )
        + ':' + pad( date.getUTCMinutes() )
        + ':' + pad( date.getUTCSeconds() )
        + '.' + String( (date.getUTCMilliseconds()/1000).toFixed(3) ).slice( 2, 5 )
        + 'Z';
};

exports.utils.getConfiguration = function (property) {
    sys.logs.debug('[pandadoc] Get property: '+property);
    return config.get(property);
};

exports.utils.verifySignature = function (body, signature) {
    var secret = config.get("webhooksSharedKey");
    if (!secret || secret === "" || !sys.utils.crypto.verifySignatureWithHmac(body, signature, secret, "HmacSHA256")) {
        sys.logs.error("Invalid signature or body");
        return false;
    }
    return true;
};

/****************************************************
 Private helpers
 ****************************************************/

var checkHttpOptions = function (url, options) {
    options = options || {};
    if (!!url) {
        if (isObject(url)) {
            // take the 'url' parameter as the options
            options = url || {};
        } else {
            if (!!options.path || !!options.params || !!options.body) {
                // options contain the http package format
                options.path = url;
            } else {
                // create html package
                options = {
                    path: url,
                    body: options
                }
            }
        }
    }
    return options;
};

var isObject = function (obj) {
    return !!obj && stringType(obj) === '[object Object]'
};

var stringType = Function.prototype.call.bind(Object.prototype.toString);

var parse = function (str) {
    try {
        if (arguments.length > 1) {
            var args = arguments[1], i = 0;
            return str.replace(/(:(?:\w|-)+)/g, () => {
                if (typeof (args[i]) != 'string') throw new Error('Invalid type of argument: [' + args[i] + '] for url [' + str + '].');
                return args[i++];
            });
        } else {
            if (str) {
                return str;
            }
            throw new Error('No arguments nor url were received when calling the helper. Please check it\'s definition.');
        }
    } catch (err) {
        sys.logs.error('Some unexpected error happened during the parse of the url for this helper.')
        throw err;
    }
}

/****************************************************
 Constants
 ****************************************************/

var PANDADOC_API_BASE_URL = "https://api.pandadoc.com";
var PANDADOC_API_URL = PANDADOC_API_BASE_URL+"/public/v1";

/****************************************************
 Configurator
 ****************************************************/

var PandaDoc = function (options) {
    options = options || {};
    options= setApiUri(options);
    options= setRequestHeaders(options);
    return options;
}

/****************************************************
 Private API
 ****************************************************/

function setApiUri(options) {
    var url = options.path || "";
    options.url = PANDADOC_API_URL + url;
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

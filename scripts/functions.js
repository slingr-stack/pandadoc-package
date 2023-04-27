var api = require('./api.js');

var httpService = svc.http;
//var pandaDocService = svc.pandadoc;
var pandaDocService = {
    _get: function(options) {
        return httpService._get(api.PandaDoc(options));
    },
    _post: function(options) {
        return httpService._post(api.PandaDoc(options));
    }
}

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
    return pandaDocService._get(options);
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
            return pandaDocService.post({
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
    return pandaDocService._post(options);
};

exports.documents.details.get = function(documentId, httpOptions) {
    if (!documentId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [documentId].');
        return;
    }
    var url = parse('/documents/:documentId/details', [documentId]);
    sys.logs.debug('[pandadoc] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return pandaDocService._get(options);
};

exports.documents.send.post = function(documentId, httpOptions) {
    if (!documentId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [documentId].');
        return;
    }
    var url = parse('/documents/:documentId/send', [documentId]);
    sys.logs.debug('[pandadoc] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return pandaDocService._post(options);
};

exports.documents.session.post = function(documentId, httpOptions) {
    if (!documentId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [documentId].');
        return;
    }
    var url = parse('/documents/:documentId/session', [documentId]);
    sys.logs.debug('[pandadoc] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    var res = pandaDocService._post(options);
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

    var httpOptions = {
        path:url,
        forceDownload: true,
        downloadSync: true,
        fileName: fileName || 'document.pdf'
    };

    var options = checkHttpOptions(url, httpOptions);
    return pandaDocService._get(options);
};

exports.templates.get = function(httpOptions) {
    var url = parse('/templates');
    sys.logs.debug('[pandadoc] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return pandaDocService._get(options);
};

exports.templates.details.get = function(templateId, httpOptions) {
    if (!templateId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [templateId].');
        return;
    }
    var url = parse('/templates/:templateId/details', [templateId]);
    sys.logs.debug('[pandadoc] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return pandaDocService._get(options);
};

////////////////////////////////////
// Public API - Generic Functions //
////////////////////////////////////

exports.getConfigurations = function (property) {
    return config.get(property);
};

exports.get = function(url, httpOptions, callbackData, callbacks) {
    var options = checkHttpOptions(url, httpOptions);
    return httpService.get(options, callbackData, callbacks);
};

exports.post = function(url, httpOptions, callbackData, callbacks) {
    options = checkHttpOptions(url, httpOptions);
    return httpService.post(options, callbackData, callbacks);
};

exports.put = function(url, httpOptions, callbackData, callbacks) {
    options = checkHttpOptions(url, httpOptions);
    return httpService.put(options, callbackData, callbacks);
};

exports.patch = function(url, httpOptions, callbackData, callbacks) {
    options = checkHttpOptions(url, httpOptions);
    return httpService.patch(options, callbackData, callbacks);
};

exports.delete = function(url, httpOptions, callbackData, callbacks) {
    var options = checkHttpOptions(url, httpOptions);
    return httpService.delete(options, callbackData, callbacks);
};

exports.head = function(url, httpOptions, callbackData, callbacks) {
    var options = checkHttpOptions(url, httpOptions);
    return httpService.head(options, callbackData, callbacks);
};

exports.options = function(url, httpOptions, callbackData, callbacks) {
    var options = checkHttpOptions(url, httpOptions);
    return httpService.options(options, callbackData, callbacks);
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

///////////////////////
//  Private helpers  //
///////////////////////

var checkHttpOptions = function (url, options) {
    options = options || {};
    if (!!url) {
        if (isObject(url)) {
            // take the 'url' parameter as the options
            options = url || {};
        } else {
            if (!!options.path || !!options.params || !!options.body) {
                // options contains the http package format
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
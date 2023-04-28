(function () {

    var PANDADOC_API_BASE_URL = "https://api.pandadoc.com";
    var PANDADOC_API_URL = PANDADOC_API_BASE_URL+"/public/v1";

    function PandaDoc (options) {
        options= setApiUri(options);
        options= setRequestHeaders(options);
        return options;
    }

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

    var mergeJSON = function (json1, json2) {
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

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = PandaDoc;
        }
        exports.PandaDoc = PandaDoc;
    }
})();

/*
for(var a in pkg.pandadoc.functions){
  log(a)
}
//*/
/*
for(var a in pkg.pandadoc.functions.documents){
  log(a)
}
//*/
/*
for(var a in pkg.testdep.test){
  log(a)
}
for(var a in pkg.testdep.test2){
  log(a)
}
//*/
/*
for(var a in pkg.randomDataGenerator){
  log(a)
}
*/
/*
for(var a in pkg.randomDataGenerator.generator){
  log(a)
}
//*/

//log(JSON.stringify(pkg.testdep.test2.aPlusB("a","b")))

//log(JSON.stringify(pkg.pandadoc.functions.get))
log(JSON.stringify(pkg.pandadoc.functions))

/****************************************************
 Listeners
 ****************************************************/

listeners.defaultWebhook = {
    label: 'Catch HTTP pandadoc events',
    type: 'service',
    options: {
        service: 'http',
        event: 'webhook',
        matching: {
            path: '/services/pandadoc'
        }
    },
    callback: function(event) {
        sys.logs.error('Received PandaDoc webhook. Processing and triggering a package event.');
        sys.logs.debug(event)
        /*
        var signature = event.signature // review the correct path to obtain signature
        if (pkg.pandadoc.listeners.verifySignature(JSON.stringify(event.data.body), signature)) {
            sys.events.triggerEvent('pandadoc:webhook',event);
        }
        */
    }
};

/****************************************************
 Public API
 ****************************************************/

exports.verifySignature = function (payload, signature) {
    var secret = config.get('webhookSecret');
    return sys.utils.crypto.verifySignaturWithHmac(payload, signature, secret, "HmacSHA256");
}
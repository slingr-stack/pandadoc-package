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
            path: '/pandadoc'
        }
    },
    callback: function(event) {
        sys.logs.info('Received PandaDoc webhook. Processing and triggering a package event.');
        var body = JSON.stringify(event.data.body);
        var signature = event.data.parameters.signature || "";

        var secret = config.get("webhooksSharedKey");
        if (!secret || secret === "" || !sys.utils.crypto.verifySignatureWithHmac(body, signature, secret, "HmacSHA256")) {
            throw new Error("Invalid signature or body");
        }
        sys.events.triggerEvent('pandadoc:webhook', body);
        return "ok";
    }
};

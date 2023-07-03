/****************************************************
 Listeners
 ****************************************************/

listeners.defaultWebhookPandadoc = {
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

        if (pkg.pandadoc.functions.verifySignature(body, signature)) {
            sys.events.triggerEvent('pandadoc:webhook', body);
            return "ok";
        }
        else throw new Error("Invalid webhook");
    }
};

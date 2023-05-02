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
        sys.logs.info('Received PandaDoc webhook. Processing and triggering a package event.');
        sys.logs.debug(event)
        sys.events.triggerEvent('pandadoc:webhook',event);
    }
};

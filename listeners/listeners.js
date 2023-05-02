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
    callback: function (event) {
        sys.logs.info('*** Received panadoc webhook. Processign and triggering a package event');
        sys.events.triggerEvent('pandadoc:webhook', event);
    }
};

App.DeliveryAdapter = DS.RESTAdapter.extend({
    host: VEENDA_HOST,
    namespace: VEENDA_NAMESPACE
});

App.Delivery = DS.Model.extend({
    name: DS.attr(),
    delivered: DS.attr(),
    rest: DS.attr(),
    dispatcher_latitude: DS.attr(),
    dispatcher_longitude: DS.attr(),
    destination_latitude: DS.attr(),
    destination_longitude: DS.attr(),
    dispatch_time: DS.attr(),
    distance: DS.attr(),
    rating_value: DS.attr(),
    comment: DS.attr()
});

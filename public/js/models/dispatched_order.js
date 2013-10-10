
App.DispatchedOrderAdapter = DS.RESTAdapter.extend({
    host: 'http://veenda01.herokuapp.com',
    namespace: 'api/v1/client'
});

App.DispatchedOrder = DS.Model.extend({
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

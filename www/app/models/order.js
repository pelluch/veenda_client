

App.OrderAdapter = DS.RESTAdapter.extend({
    find: function(store, type, id) {
        return this.ajax(this.buildURL(type.typeKey, id) + "?client=true", 'GET');
    },
    host: VEENDA_HOST,
    namespace: VEENDA_NAMESPACE
});

App.Order = DS.Model.extend({
    name: DS.attr(),
    delivered: DS.attr(),
    rest: DS.attr(),
    dispatcher_latitude: DS.attr(),
    dispatcher_longitude: DS.attr(),
    delivery_id: DS.attr(),
    destination_latitude: DS.attr(),
    destination_longitude: DS.attr(),
    dispatch_time: DS.attr(),
    distance: DS.attr(),
    estimated_time: DS.attr(),
    rating_value: DS.attr(),
    comment: DS.attr(),
    summary: DS.attr()
});
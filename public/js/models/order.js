

App.OrderAdapter = DS.RESTAdapter.extend({
    find: function(store, type, id) {
        return this.ajax(this.buildURL(type.typeKey, id), 'GET');
    },
    host: VEENDA_HOST,
    headers: {"X-AUTH-TOKEN" : "be3bee55-1ad1-4a9e-900c-98200f5c3005" },
    namespace: VEENDA_NAMESPACE
});

App.Order = DS.Model.extend({
    name: DS.attr(),
    delivered: DS.attr(),
    rest: DS.attr(),
    dispatcher_latitude: DS.attr(),
    dispatcher_longitude: DS.attr(),
    destination_latitude: DS.attr(),
    destination_longitude: DS.attr(),
    dispatch_time: DS.attr(),
    distance: DS.attr(),
    estimated_time: DS.attr(),
    rating_value: DS.attr(),
    comment: DS.attr(),
    summary: DS.attr()
});

function refreshOrdersList() {
    App.chair.all(function(records) {
        for(var i = 0; i < records.length; ++i) {
            var tmp = records[i];
            console.log(tmp);
            //tmp["delivered"] = false;
            //App.chair.save(tmp);
        }
    });

};
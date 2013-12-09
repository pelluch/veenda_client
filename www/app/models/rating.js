
App.RatingAdapter = DS.RESTAdapter.extend({
    host: VEENDA_HOST,
    namespace: VEENDA_NAMESPACE
});

App.Rating = DS.Model.extend({
    delivery_id: DS.attr(),
    value: DS.attr(),
    comment: DS.attr(),
    summary: DS.attr()
});
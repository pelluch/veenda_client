 var store = new Lawnchair({
        adapter: "dom",
        name: "veenda_client"
    }, function(store) {
});


App = Ember.Application.create({
    // Para efectos de debugging
    LOG_TRANSITIONS: true,
    currentPath: '',
});


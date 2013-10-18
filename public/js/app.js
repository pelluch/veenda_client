
App = Ember.Application.create({
    // Para efectos de debugging
    LOG_TRANSITIONS: true,
    currentPath: '',
});

App.chair = new Lawnchair({
        adapter: "dom",
        name: "veenda_client"
    }, function(store) {
});

App.refreshSavedOrders = function() {
	alert('hi');
      App.chair.all( function(records) {
        loginController.set('saved_orders', records);

          }
      );
    };
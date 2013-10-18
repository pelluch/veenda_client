
App.LoginRoute = Ember.Route.extend({
    enter: function() {
    App.refreshSavedOrders();
      //this.controllerFor("login").refreshSavedOrders();
    }
});

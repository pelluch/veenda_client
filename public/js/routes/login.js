
App.LoginRoute = Ember.Route.extend({
    enter: function() {
      this.controllerFor("login").refreshSavedOrders();
      
    }
});

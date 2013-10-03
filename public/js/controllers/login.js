App.LoginController = Ember.Controller.extend({

    refreshSavedOrders: function() {
       var self = this;
      store.all( function(records) {
        self.set('saved_orders', records);
          }
      );
    },
    actions: {
        insert: function(event) {
		      this.transitionToRoute('dispatched_orders.dispatched_order', this.get('codigo'));
        },
        removeLink: function(param) {
          store.remove(param);
          this.refreshSavedOrders();
        }
    }
});

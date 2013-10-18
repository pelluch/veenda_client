App.LoginController = Ember.Controller.extend({
    init: function(params) {
        this.refreshSavedOrders();
    },
    refreshSavedOrders: function() {
       var self = this;
      App.chair.all( function(records) {
        self.set('saved_orders', records);

          }
      );
    },

    actions: {
        insert: function(event) {
    			if(typeof this.get('codigo') == 'undefined' || this.get('codigo').match(/^\s*$/)) {
            
          }
    			else {
    				this.transitionToRoute('dispatched_orders.dispatched_order', this.get('codigo'));
    			}
        },
        removeLink: function(param) {
          App.chair.remove(param);
          this.refreshSavedOrders();
        }
     }
});

var loginController = App.LoginController.create();
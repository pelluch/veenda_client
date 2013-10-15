App.DispatchedOrdersDispatchedOrderController = Ember.ObjectController.extend({

  init: function(params) {
      var self = this;
      
      var id = setInterval(function() {
        self.refreshMyData()
      }, 5000);
      this.interval_id = id;
    },
    refreshMyData: function(params) {
      if(App.get('currentPath') == 'dispatched_orders.dispatched_order') {
        this.transitionToRoute(App.get('currentPath'));
      }
    },

    actions: {
      
      insert: function(event) {

        var order_id = this.get('content.id');
        var store = this.get('store');
        var self = this;
          $.ajax({
               
               url: 'http://veenda01.herokuapp.com/api/v1/client/dispatched_orders/' + order_id,
               type: 'PUT',
               data: JSON.stringify({
                    dispatched_order: {
                      delivered: true
                    }
                }),
               contentType: "application/json",
               dataType: "text",
               success: function(response) {
                console.log('response: ' + response);
               store.find('dispatched_order', order_id).then( function(model) {
                  model.set('delivered', true);
                });
				
            }
         });
		  this.transitionToRoute('ranking', order_id);
      },
      back: function(event) {
          this.transitionToRoute('login');
      },
      mapTrue: function() {
          this.set('isMap', true)
      },
      mapFalse: function() {
          this.set('isMap', false)
      }
    },
    isMap: false
});


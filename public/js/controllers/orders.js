App.OrdersOrderController = Ember.ObjectController.extend({

  init: function(params) {
      var self = this;
      
      var id = setInterval(function() {
        self.refreshMyData()
      }, 1000);
      this.interval_id = id;	  
	  //if(sessionStorage.get('map')==true)
		//{
		//	isMap = true;
		//}
		
    },
    refreshMyData: function(params) {
      this.get('content').reload();
      if(App.get('currentPath') == 'orders.order') {
        this.transitionToRoute(App.get('currentPath'));
      }
    },
    actions: {
      insert: function(event) {
        var order_id = this.get('content.id');
        var store = this.get('store');
        var self = this;
          $.ajax({
               
               url: VEENDA_FULL_URL + '/deliveries/' + order_id,
               type: 'PUT',
               data: JSON.stringify({
                    order: {
                      delivered: true
                    }
                }),
               contentType: "application/json",
               dataType: "text",
               success: function(response) {
                  console.log('response: ' + response);
                  store.find('order', order_id).then( function(model) {
                    model.set('delivered', true);
                  });
              }
         });

		  this.transitionToRoute('rating', order_id);
      },
      back: function(event) {
          this.transitionToRoute('login');
      },
  	  reset: function(event) {
  	    var order_id = this.get('content.id');
        var store = this.get('store');
        var self = this;
        $.ajax({               
            url: VEENDA_FULL_URL + '/deliveries/' + order_id,
            type: 'PUT',
            data: JSON.stringify({
              order: {
                  delivered: false
                  }
              }),
            contentType: "application/json",
            dataType: "text",
            success: function(response) {
                console.log('response: ' + response);
                store.find('order', order_id).then( function(model) {
                   model.set('delivered', false);
				   model.set('comment', "");
				   model.set('rating_value', 0);
                  });
                }
         });
        App.chair.get(order_id, function(obj) {
          console.log(obj);
          obj.delivered = false;
          App.chair.save(obj);
        });
		    this.transitionToRoute('orders.order', this.get('content.order'));
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

App.DispatchedOrdersDispatchedOrderController = Ember.ObjectController.extend({

  init: function(params) {
      var self = this;
      
      var id = setInterval(function() {
        self.refreshMyData()
      }, 5000);
      this.interval_id = id;	  
	  //if(sessionStorage.get('map')==true)
		//{
		//	isMap = true;
		//}
		
      self.getDistance();
    },
    refreshMyData: function(params) {
      
      if(App.get('currentPath') == 'dispatched_orders.dispatched_order') {
        this.transitionToRoute(App.get('currentPath'));
      }
    },
    getDistance: function() {
      var dispatcher_latitude = this.get('store').get('dispatcher_latitude');
      var dispatcher_longitude = this.get('dispatcher_longitude');
      var destination_latitude = this.get('destination_latitude');
      var destination_longitude = this.get('destination_longitude');

      var current_pos = new google.maps.LatLng(dispatcher_latitude, dispatcher_longitude);
      var end_pos = new google.maps.LatLng(destination_latitude, destination_longitude);
      var distance = Math.floor((google.maps.geometry.spherical.computeDistanceBetween(current_pos, end_pos) / 1000).toFixed(1));
      //this.set("distance", distance);
    },

    actions: {
      insert: function(event) {
        var order_id = this.get('content.id');
        var store = this.get('store');
        var self = this;
          $.ajax({
               
               url: VEENDA_FULL_URL + '/dispatched_orders/' + order_id,
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
  	  reset: function(event) {
  	    var order_id = this.get('content.id');
        var store = this.get('store');
        var self = this;
        $.ajax({               
            url: VEENDA_FULL_URL + '/dispatched_orders/' + order_id,
            type: 'PUT',
            data: JSON.stringify({
              dispatched_order: {
                  delivered: false
                  }
              }),
            contentType: "application/json",
            dataType: "text",
            success: function(response) {
                console.log('response: ' + response);
                store.find('dispatched_order', order_id).then( function(model) {
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
		    this.transitionToRoute('dispatched_orders.dispatched_order', this.get('content.order'));
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

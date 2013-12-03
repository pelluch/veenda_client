App.OrdersOrderController = Ember.ObjectController.extend({

  interval_id: null,
	//init: refreshes the page every 1 second.
  init: function(params) {

    var self = this;

    var interval_id = setInterval(function() {
      self.refreshMyData()
    }, 5000);
    this.interval_id = interval_id;	  

  },
  refreshMyData: function(params) {
    var content = this.get('content');
    if(content) {
      this.get('content').reload();
      if(App.get('currentPath') == 'orders.order') {
        this.transitionToRoute(App.get('currentPath'));
      }
    }
    else {
      clearInterval(this.interval_id);
    }

  },
  actions: {
	//insert gets the id searched in the homepage looks for it in the API
    insert: function(event) {
      var order_id = this.get('content.id');
      var store = this.get('store');
      var self = this;
      $.ajax({
	//url returns the URL of the delivery page
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

        App.chair.get(order_id + "", function(lawnOrder) {
          lawnOrder.delivered = true;
          App.chair.save(lawnOrder);
        });
        console.log('response: ' + response);
        store.find('order', order_id).then( function(model) {
          model.set('delivered', true);
        });
      }
    });

      this.transitionToRoute('rating', order_id);
    },
	//back:allows you to go back to the home page
    back: function(event) {
      this.transitionToRoute('login');
    },
	//reset: refreshes the page content
    reset: function(event) {
     var order_id = this.get('content.id');
     var store = this.get('store');
     var self = this;
     this.get('content').reload();
     $.ajax({               
      url: VEENDA_FULL_URL + '/deliveries/' + order_id,
      type: 'PUT',
      async: true,
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
        App.chair.get(order_id + '', function(lawnOrder) {          
          lawnOrder.delivered = false;
          App.chair.save(lawnOrder);
        });
      }
    });
     this.get('content').reload();
     this.transitionToRoute('orders.order', this.get('content.order'));
   },
   //mapTrue: sets the Map to true
   mapTrue: function() {
    this.set('isMap', true)
  },
  //map False: sets the Map to False
  mapFalse: function() {
    this.set('isMap', false)
  },
  //rate: redirects the user to the rating page
  rate: function(event) {
    var order_id = this.get('content.id');
    this.transitionToRoute('rating', order_id);
  }
},
isMap: false
});

App.LoginController = Ember.Controller.extend({

    saved_orders: null,
    refresh_idx: null,
    init: function() {
      var self = this;
      
      var id = setInterval(function() {
        self.refreshMyData()
      }, 5000);
      this.interval_id = id;

    },
    refreshMyData: function(params) {
      this.refreshSavedOrders();
      if(App.get('currentPath') == 'orders.order') {
        this.transitionToRoute(App.get('currentPath'));
      }
    },
	  refreshSavedOrders: function() {
      if(this.get('refresh_idx') != null)
      {
        alert(this.get('refresh_idx'));
      }
       var self = this;
       console.log('refreshing orders');
       var old_values;
      App.chair.all( function(records) {
		  
		  var final = new Array();
		  var aux = 0;
		  for(i = 0; i<records.length;i++)
		  {
			  if(records[i].delivered==false)
			  {
				  final.push(records[i]);
				  
			  }
		  }
		  for(i = 0; i<records.length;i++)
		  {
			  if(records[i].delivered==true)
			  {
				  final.push(records[i]);
				  aux++;
			  }
		 }
		  
		  old_values = final;
		  self.set('saved_orders', final); 
        });
        
        // for(var i = 0; i < records.length; ++i)
        // {
        //   var idx = i;
        //     var order = self.get('store').find('order', records[i].key).then( function(order) {
            
        //         $.ajax({               
        //         url: 'http://veenda01.herokuapp.com/api/v1/client/orders/' + order.id,
        //         type: 'GET',
        //         contentType: "application/json",
        //         dataType: "json",
        //         success: function(response) {
        //           var delivered = response['order']['delivered'];
        //             console.log('response: ' + response['order']['delivered']);
        //              updated_value = {id : response['order']['id'], name : response['order']['name'], 
        //             delivered: response['order']['delivered'] };
        //             console.log(idx);
        //            var old_value = records[idx];
        //            console.log(old_value);
        //             //self.set('saved_orders', updated_value);
        //             //store.find('order', order_id).then( function(model) {
        //              //  model.set('delivered', false);
        //             //  });
        //             }
        //      });

        //       //console.log(records[i].delivered);
        //       //records[i].delivered = order.delivered;
        //       //App.chair.save(records[i]);
        //     });

        // }
        //self.set('saved_orders', records); 
        //console.log(records);
        //self.set('saved_orders', new_list);
          
      
    
    },
    actions: {
        insert: function(event) {
    			if(typeof this.get('codigo') == 'undefined' || this.get('codigo').match(/^\s*$/)) {
            
          }
    			else {
    				this.transitionToRoute('orders.order', this.get('codigo'));
    			}
        },
		activatemap: function(key) {
				sessionStorage.setItem('map', true);
				this.transitionToRoute('orders.order', key);
        },
		removeLink: function(param) {
          App.chair.remove(param);
          this.refreshSavedOrders();
        }
    },
	isClose: function() {
		alert(this.get('saved_orders'));
		return true;
	}.property('afd')
});
App.LoginController = Ember.Controller.extend({

    saved_orders: null,
    refresh_idx: null,
    init: function() {
      
      var id = setInterval(refreshOrdersList, 5000);
      this.interval_id = id;

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

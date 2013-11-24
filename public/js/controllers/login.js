App.LoginController = Ember.Controller.extend({

	saved_orders: null,
	self: null,
	interval_id: null,
	init: function() {
		self = this;
		self.refreshOrdersList();
	},
	refreshOrdersList: function() {
		var newList = [];
		clearInterval(self.get('interval_id'));
		App.chair.all(function(records) 
		{
			for(var i = 0; i < records.length; ++i) 
			{
				$.ajax({
					url: VEENDA_FULL_URL + '/orders/' + records[i].id,
					type: 'GET',
					async: true
				})
				.done(function(data, status) {
					var currentOrder, currentDelivered, currentDispatchTime;
					App.chair.get(data.delivery.id, function(lawnOrder) {
						currentOrder = lawnOrder;
						currentDelivered = lawnOrder.delivered;
						currentDispatchTime = lawnOrder.dispatch_time;
					});

					var delivered = data.delivery.delivered;
					var dispatchTime = data.delivery.dispatch_time;

					if(currentDelivered != delivered || currentDispatchTime != dispatchTime) 
					{
						currentOrder.delivered = delivered;						
						currentOrder.dispatch_time = currentDispatchTime;
						App.chair.save(currentOrder);
					}
				})
				.fail(function() {
					console.log("error");
				})
				.always(function() {

				});
				newList.push(records[i]);
			}
			self.set('saved_orders', newList);
			var interval_id = setInterval(self.refreshOrdersList, 5000);
			self.set('interval_id', interval_id);
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
			//this.refreshSavedOrders();
		}
	},
	orderList: function() {
		return this.get('saved_orders');
	}.property('saved_orders'),

	
});

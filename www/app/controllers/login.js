

App.LoginController = Ember.Controller.extend({

	saved_orders: null,
	self: null,
	interval_id: null,
	
	init: function() {
		self = this;
		self.refreshOrdersList();
	},
	<!--REFRESH THE ORDER LIST-->
	refreshOrdersList: function(replaceNow) {

		clearInterval(self.get('interval_id'));
		if(App.isMobile) {		
			var uuid = device.uuid;
			var hasConnection = App.cordova.checkConnection(false);
			if(hasConnection) {
				$.getJSON(VEENDA_FULL_URL + '/orders' , {phone_uuid: uuid}, function(ordersJson, ordersTextStatus) {
				
					for(var i = 0; i < ordersJson.length; ++i) {
						$.getJSON(VEENDA_FULL_URL + '/orders/' + ordersJson[i], {client: true}, function(orderJson, orderTextStatus) {
							
							orderJson = orderJson.order;
							var toSave = { key : orderJson.id + '', id: orderJson.id, name: orderJson.name,
							delivered: orderJson.delivered, rest: orderJson.rest, dispatch_time: orderJson.dispatch_time,
							distance: orderJson.distance, estimated_time: orderJson.estimated_time, type : 'order'};
							App.chair.save(toSave);				
							App.chair.all(function(records) {
								self.set('saved_orders', records);
							});
							
						});
					}					
				})
				.fail(function(error) {
					console.log(error);
				});
			}

		}
		else {
			App.chair.all(function(records) 
			{
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
					if(!records[i].dispatch_time && !records[i].delivered)
					{
						final.push(records[i]);
						aux++;
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


				records = final;

				if(replaceNow) {
					self.set('saved_orders', records);
				}
				else if(records.length == 0) {

				}
				else if(!self.get('saved_orders')) {
					self.set('saved_orders', records);
				}
				else if(self.get('saved_orders').length != records.length) {
					self.set('saved_orders', records);
				}			
				else
				{				
					var ajaxArray = [];
					for(var i = 0; i < records.length; ++i) 
					{
						ajaxArray.push(
							$.ajax({
								url: VEENDA_FULL_URL + '/orders/' + records[i].id,
								type: 'GET',
								async: true
							}));				
					}

					var defer = $.when.apply($, ajaxArray);
					defer.done(function(args) {
						var changed = false, newList = [];
						if(ajaxArray.length > 1)
						{
							$.each(arguments, function(index, responseData) {
								var data = responseData[0];
								var currentOrder, currentDelivered, currentDispatchTime;
								App.chair.get(data.id, function(lawnOrder) {
									currentOrder = lawnOrder;
									currentDelivered = lawnOrder.delivered;
									currentDispatchTime = lawnOrder.dispatch_time;
								});

								var delivered = null, dispatchTime = null;
								if(data.delivery) {
									delivered = data.delivery.delivered;
									dispatchTime = data.delivery.dispatch_time;
								}

								if(currentDelivered != delivered || currentDispatchTime != dispatchTime) 
								{
									currentOrder.delivered = delivered;						
									currentOrder.dispatch_time = currentDispatchTime;
									App.chair.save(currentOrder);		
									changed = true;			
								}
								newList.push(currentOrder);
							});
						}
						else if(ajaxArray.length == 1) 
						{
							var data = args;
							var currentOrder, currentDelivered, currentDispatchTime;
							App.chair.get(data.id, function(lawnOrder) {
								currentOrder = lawnOrder;
								currentDelivered = lawnOrder.delivered;
								currentDispatchTime = lawnOrder.dispatch_time;
							});

							var delivered = null, dispatchTime = null;
							if(data.delivery) {
								delivered = data.delivery.delivered;
								dispatchTime = data.delivery.dispatch_time;
							}					

							if(currentDelivered != delivered || currentDispatchTime != dispatchTime) 
							{
								currentOrder.delivered = delivered;						
								currentOrder.dispatch_time = currentDispatchTime;
								App.chair.save(currentOrder);		
								changed = true;			
							}
							newList.push(currentOrder);
						}
						if(self.get('saved_orders').length != newList.length) {
							changed = true;
						}
						if(changed) {
							console.log('change');
							self.set('saved_orders', newList);
						}		

					});
}

});
}

var interval_id = setInterval(self.refreshOrdersList, 5000);
self.set('interval_id', interval_id);
fixHeights();



},
actions: {
	<!--GOES TO THE ORDER STATUS PAGE-->
	insert: function(event) {
		if(typeof this.get('codigo') == 'undefined' || this.get('codigo').match(/^\s*$/)) {

		}
		else {
			this.transitionToRoute('orders.order', this.get('codigo'));
		}
	},
	<!--GOES TO THE POSITIONING MAP OF THE ORDER-->
	activatemap: function(key) {
		sessionStorage.setItem('map', true);
		this.transitionToRoute('orders.order', key);
	},
	<!--REMOVES ONE ORDER FROM THE ORDER LIST-->
	removeLink: function(param) {
		App.chair.remove(param);
		App.chair.all(function(records) {
			self.set('saved_orders', records);
		});
	},
	erase: function() {
		App.chair.nuke();
		self.set('saved_orders', null);		
	},
	pair: function(event) {
		var token = this.get('codigo');
		if(device) {
			console.log(device.uuid);
			console.log(token);

			$.ajax({
				url: VEENDA_FULL_URL + '/token',
				type: 'PUT',
				dataType: 'json',
				data: {phone_uuid: device.uuid, code: token}
			})
			.done(function(obj) {
				console.log("success!!");
				console.log(obj);
			})
			.fail(function() {
				console.log("error");
			})
			.always(function() {
				console.log("complete");
			});
			
		}
	}
},
<!--RETURNS THE ORDER LIST-->
orderList: function() {
	return this.get('saved_orders');
}.property('saved_orders'),
<!--RETURNS THE ORDER LIST CHANGED-->
orderListChanged: function() {
	fixHeights();
}.observes('saved_orders')


});

$.ajax({
	url: 'app/templates/orders_order.handlebars',
	dataType: 'text',
	async: false,
	success: function (resp) {
		App.OrdersOrderView = Ember.View.extend({
			template: Ember.Handlebars.compile(resp),
		});
	}
});

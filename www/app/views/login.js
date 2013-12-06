
$.ajax({
	url: 'app/templates/login.handlebars',
	dataType: 'text',
	async: false,
	success: function (resp) {
		//console.log(resp);
		App.LoginView = Ember.View.extend({

			didInsertElement: function() {
				Ember.run.schedule('afterRender', this, this.listChanged);
			},
			didChangeList: function() {
				Ember.run.schedule('afterRender', this, this.listChanged);
			}.observes('controller.saved_orders'),

			listChanged: function() {
				console.log('list changed!');
				fixHeights();
			},
			template: Ember.Handlebars.compile(resp)
		});

	}
});


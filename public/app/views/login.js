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
	}
});

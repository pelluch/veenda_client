App.LoginView = Ember.View.extend({

	didInsertElement: function() {
		//Ember.run.schedule('afterRender', this, this.listChanged);
		fixHeights();
	},
	didChangeList: function() {
		Ember.run.schedule('afterRender', this, this.listChanged);
	}.observes('controller.saved_orders'),
	listChanged: function() {
		console.log('list changed!');
		fixHeights();
	}
});

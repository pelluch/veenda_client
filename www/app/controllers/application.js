App.ApplicationController = Ember.Controller.extend({
    updateCurrentPath: function() {
      App.set('currentPath', this.get('currentPath'));
    }.observes('currentPath'),
    actions: {
    	back: function(idx) {
    		this.transitionToRoute('login');
    	}
    }
});

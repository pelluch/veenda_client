
$.ajax({
	url: 'app/templates/application.handlebars',
	dataType: 'text',
	async: false,
	success: function (resp) {
		initializeApplicationView(resp);
	}
});

function initializeApplicationView(text) {

	App.ApplicationView = Ember.View.extend({
		template: Ember.Handlebars.compile(text),
		elementId: 'app-view'
	});

}
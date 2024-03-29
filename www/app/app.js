

App = Ember.Application.create({
	LOG_TRANSITIONS: true,
	currentPath: '',
});

var fixHeights = function() {

	var largestGroup = 0;
	var groupHeight;
	$('.btn-group').each( function() {
		groupHeight = $(this).outerHeight();
		if(groupHeight > largestGroup) {
			largestGroup = groupHeight;
		}
	});

	$('.col-order-info').each( function() {

		var thisHeight = $(this).outerHeight();
		$(this).outerHeight(largestGroup);		
		var child = $(this).find('.btn-height')[0];
		var childHeight = $(child).height();
		$(child).css({
			"top": thisHeight/2 - childHeight/2
		});	
	});
}


App.chair = new Lawnchair({
	adapter: "dom",
	name: "veenda_client"
}, function(store) {
});


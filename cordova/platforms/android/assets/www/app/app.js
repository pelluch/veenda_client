
App = Ember.Application.create({
    // Para efectos de debugging
    LOG_TRANSITIONS: true,
    currentPath: '',
});

var fixHeights = function() {
	var largestGroup = 0;
	var groupHeight;
	$('.btn-group').each( function() {
		groupHeight = $(this).height();
		if(groupHeight > largestGroup) {
			largestGroup = groupHeight;
		}
	});

	$('.col-order-info').each( function() {
		var btnHeight = $(this).height();
		var diff = largestGroup - btnHeight;
		var padding = diff/1.1;
		if(diff > 0){
			$(this).height(largestGroup);
			var child = $(this).find('.btn')[0];
			$(child).css({
				"padding-top": padding
			});	
		}

	});
}

App.chair = new Lawnchair({
        adapter: "dom",
        name: "veenda_client"
    }, function(store) {
});


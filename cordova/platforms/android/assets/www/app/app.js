
App = Ember.Application.create({
    // Para efectos de debugging
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
		console.log('Current height: ' + thisHeight);
		console.log('Largest: ' + largestGroup);
		$(this).outerHeight(largestGroup);
		
		console.log('Current height now: ' + thisHeight);
		// var btnHeight = $(this).height();
		// var diff = largestGroup - btnHeight;
		// var padding = diff/1.1;
		// if(diff > 0){
			
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


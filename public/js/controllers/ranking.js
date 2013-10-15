App.RankingController = Ember.Controller.extend({
    actions: {
        vote: function(event) {
      var elements = document.getElementsByClassName("active");
			var starvalue = 0;
			for (var i = 0; i < elements.length; i++) {
				starvalue = elements[i].id; 
			}
      var box = document.getElementsByClassName("comment-box");
      var comment = box[0].value;
  
     $.ajax({
             
             url: 'http://veenda01.staging.herokuapp.com/api/v1/client/ratings',
             type: 'POST',
             data: JSON.stringify({
                  rating: {
                    rating: starvalue,
                    comment: comment,
                    dispatched_order_id: this.get('content.order')
                  }
              }),
             contentType: "application/json",
             dataType: "text",
             success: function(response) {
              console.log('response: ' + response);
             // store.find('dispatched_order', order_id).then( function(model) {
              //  model.set('delivered', true);
              //});
      
          }
       });

      this.get('store').find('dispatched_order', this.get('content.order')).then( function(model) {
                    model.set('rating_value', starvalue);
                    model.set('comment', comment);
                  });
      this.transitionToRoute('dispatched_orders.dispatched_order', this.get('content.order'));
		  //alert(starvalue);

     }
    }
});

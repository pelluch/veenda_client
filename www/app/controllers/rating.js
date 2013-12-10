App.RatingController = Ember.Controller.extend({
    init: function (params){
        //this.get('content').reload();
    },
	
    actions: {
	//vote: sends the information of the rating to be stored
        vote: function(event) {
    	  	/*var elements = document.getElementsByClassName("active");
      			var starvalue = 0;
      			for (var i = 0; i < elements.length; i++) {
      				starvalue = elements[i].id; 
      			}*/
            var starvalue = 0;
            var rating = document.getElementsByClassName("rating");
            var rating_pre_value = $(".rating").attr('rating-value');
            if(rating_pre_value != null){
              starvalue = parseInt(rating_pre_value)+1;
            }
			
          var box = document.getElementsByClassName("comment-box");
		  var summary = box[0].value;
          var comment = box[1].value;
		  if(comment=="")
			{
				comment = " ";
			}
		  if(summary=="")
			{
				summary = " ";
			}
          $.ajax({
             url: VEENDA_FULL_URL + '/ratings',
             type: 'POST',
             data: JSON.stringify({
                  rating: {
                    value: starvalue,
                    comment: comment,
                    summary: summary,
                    delivery_id: this.get('content.order')
                  }
              }),
             contentType: "application/json",
             dataType: "text",
             success: function(response) {
                  console.log('response: ' + response);
                  // store.find('order', order_id).then( function(model) {
                  //  model.set('delivered', true);
                  //});
              }
          });

          this.get('store').find('order', this.get('content.order')).then( function(model) {
                        model.set('rating_value', starvalue);
                        model.set('comment', comment);
                        model.set('summary', summary);
                    });
          this.transitionToRoute('login');
        },
		//skip: sends the user to the order page
        skip: function(){
          this.transitionToRoute('login');
        }
    }
});

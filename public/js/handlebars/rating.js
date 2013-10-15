Ember.Handlebars.helper("rating", Ember.View.extend({
  classNames: ["rating"],
  symbol: "☆",
  max: 5,
  value: 0,
  render: function(buffer){
		var rating = this.get("value");
		var returnValue = '<div class="progress  ranking-lg-50">';
	    returnValue += '<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="';
	    returnValue += rating;
	    returnValue += '" aria-valuemin="0" aria-valuemax="100" style="width: ';
	    returnValue += rating*20;
	    returnValue += '%"></div></div>';
	    buffer.push(returnValue);
  },
  didInsertElement: function(){
		var _this = this;
		var mouse_down = false;
		$("body").mousemove("rating", function(e){
			if(mouse_down == true){
				var x = e.pageX - ($(".progress").offset().left);
				var width = $(".progress").width();
				if(x <= 0){ 
					x = 0;
				}
				if(x >= width){
					x = width;
				}
				var rating = Math.floor(x*(5+1)/width);
			    _this.$(".progress-bar").css("width", rating*20 +'%');
			    _this.$(".progress-bar").attr("aria-valuenow", rating);
			    $("#ranking-value").html(rating + ' puntos (' + rating*20 + '%)');
			}
		});

		this.$(".progress").mousedown("rating", function(e){
			mouse_down = true;
		});
		$("body").mouseup("rating", function(e){
			mouse_down = false;
		});
  },
  willDestroyElement: function(){
		this.$("span").off("click.rating");
  }
}));

//Google Map
App.Marker = Ember.Object.extend({
});



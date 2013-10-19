Ember.Handlebars.helper("rating", Ember.View.extend({
   classNames: ["rating"],
   symbol: "☆",
   max: 5,
   value: 0,
   render: function(buffer){
 		var max = this.get("max");
 		for(var i = max; i > 0; i--) {
 		  buffer.push("<span data-value='" + i + "' class='" + (i === this.get("value") ? "active" : "") + "'>" + this.get("symbol") + "</span>");
 		}
   },
   didInsertElement: function(){
	 	var _this = this;
	 	this.$("span").on("click.rating", function(e){
	 	_this.$("span").removeClass("active");
	 	var $target = $(e.currentTarget);
	    $target.addClass("active");
	 	 _this.set("value", $target.data("value"));
	 	});
   }, 
   willDestroyElement: function(){
	 	this.$("span").off("click.rating");
   }
 }));


//Google Map
App.Marker = Ember.Object.extend({
});



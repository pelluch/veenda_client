Ember.Handlebars.helper("rating", Ember.View.extend({
   classNames: ["rating"],
   symbol: "☆",
   max: 5,
   value: 0,
   render: function(buffer){
 		var max = this.get("max");
 		for(var i = 0; i < max; i++) {
 		  //buffer.push("<span id='" + i + "' class='" + (i === this.get("value") ? "active" : "") + "'>" + this.get("symbol") + "</span>");
 		   buffer.push('<span id="'+i+'" class="rating-star">'+this.get("symbol")+'</span>');
      }
      $(".rating").attr("value", 0);
   },
   didInsertElement: function(){
      this.$(".rating-star").click( function(e){
         var $target = $(e.currentTarget);
         var id = $target.attr('id');

         var max = 5;
         for(var i = 0; i < max; i++) {
            if(i <= id){
               $("#"+i).addClass("rating-star-active");
            }
            else{
               $("#"+i).removeClass("rating-star-active");
            }
         }
         $(".rating").attr("rating-value", id);
      });
      this.$(".rating-star").hover( function(e){
         var $target = $(e.currentTarget);
         var id = $target.attr('id');

         var max = 5;
         for(var i = 0; i < max; i++) {
            if(i <= id){
               $("#"+i).addClass("rating-star-active");
            }
            else{
               $("#"+i).removeClass("rating-star-active");
            }
         }
      });
      this.$(".rating-star").mouseout( function(e){
         var $target = $(e.currentTarget);
         var id = $(".rating").attr("rating-value");

         var max = 5;
         for(var i = 0; i < max; i++) {
            if(i <= id){
               $("#"+i).addClass("rating-star-active");
            }
            else{
               $("#"+i).removeClass("rating-star-active");
            }
         }
      });
	 	/*var _this = this;
	 	this.$("span").on("click tap", function(e){
	 	_this.$("span").removeClass("active");
	 	var $target = $(e.currentTarget);
	    $target.addClass("active");
	 	 _this.set("value", $target.data("value"));
	 	});*/
      
   }, 
   willDestroyElement: function(){
	 	this.$("span").off("click tap");
   }
 }));


//Google Map
App.Marker = Ember.Object.extend({
});



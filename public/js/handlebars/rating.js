Ember.Handlebars.helper("rating", Ember.View.extend({
   classNames: ["rating"],
   max: 5,
   value: 0,
   render: function(buffer){
      var max = this.get("max");
      for(var i = 0; i < max; i++) {
         buffer.push('<i id="'+i+'" class="fa fa-star-o"> </i>');
      }
      $(".rating").attr("value", 0);
   },
   didInsertElement: function(){
      this.$("i.fa").click( function(e){
         var $target = $(e.currentTarget);
         var id = $target.attr('id');

         var max = 5;
         for(var i = 0; i < max; i++) {
            if(i <= id){
               $("#"+i).addClass("fa-star");
               $("#"+i).removeClass("fa-star-o");
            }
            else{

               $("#"+i).addClass("fa-star-o");
               $("#"+i).removeClass("fa-star");
            }
         }
         $(".rating").attr("rating-value", id);
      });
      this.$("i.fa").hover( function(e){
         var $target = $(e.currentTarget);
         var id = $target.attr('id');

         var max = 5;
         for(var i = 0; i < max; i++) {
            if(i <= id){
               $("#"+i).addClass("fa-star");
               $("#"+i).removeClass("fa-star-o");
            }
            else{
               $("#"+i).addClass("fa-star-o");
               $("#"+i).removeClass("fa-star");
            }
         }
      });
      this.$("i.fa").mouseout( function(e){
         var $target = $(e.currentTarget);
         var id = $(".rating").attr("rating-value");

         var max = 5;
         for(var i = 0; i < max; i++) {
            if(i <= id){
               $("#"+i).addClass("fa-star");
               $("#"+i).removeClass("fa-star-o");
            }
            else{
               $("#"+i).addClass("fa-star-o");
               $("#"+i).removeClass("fa-star");
            }
         }
      });

   }, 
   willDestroyElement: function(){
      this.$("i").off("click tap");
   }
}));


//Google Map
App.Marker = Ember.Object.extend({
});



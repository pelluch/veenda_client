
Ember.Handlebars.registerHelper('rating_helper', function(condition, options) {
    //alert(condition);
/*
    var returnValue = '';
    var rating = this.get('rating_value');

    returnValue = '<div class="progress rating-lg-50">';
    returnValue += '<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="';
    returnValue += rating;
    returnValue += '" aria-valuemin="0" aria-valuemax="100" style="width: ';
    returnValue += rating*20;
    returnValue += '%"></div>';
    returnValue += '</div>';
    returnValue += '<p id="rating-value" class="margin-0-20">' + rating + ' puntos ('+ rating*20 + '%)</p>';
    return new Ember.Handlebars.SafeString(returnValue);
*/

    var returnValue = '<h2><div class="ember-view rating">';
    var rating = this.get('rating_value');

    for(var i = 1; i <= 5; i++) {
       if(i <= rating) {
          returnValue = returnValue + '<i class="fa fa-star"></i>';
       }
       else{
            returnValue = returnValue + '<i class="fa fa-star-o"></i>';
       }
    }
    returnValue = returnValue + "\n</div></h2></br></br>";
    return new Ember.Handlebars.SafeString(returnValue);
});

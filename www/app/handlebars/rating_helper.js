
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

    var returnValue = '<h2><div class="ember-view rating row">';
    var rating = this.get('rating_value');

    for(var i = 1; i <= 5; i++) {
     if(i <= rating) {
      if(i == 1) {
        returnValue = returnValue + '<div class="col-xs-2 col-xs-offset-1 col-sm-2 col-sm-offset-1"><p><i class="fa fa-star first-star"></i></p></div>';
      }
      else {
        returnValue = returnValue + '<div class="col-xs-2 col-sm-2"><p><i class="fa fa-star center-star"></i></p></div>';
      }
    }
    else{
      returnValue = returnValue + '<div class="col-xs-2"><p><i class="fa fa-star-o center-star"></i></p></div>';
    }
  }
  returnValue = returnValue + "\n</div></h2></br></br>";
  return new Ember.Handlebars.SafeString(returnValue);
});

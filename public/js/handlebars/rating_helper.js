
Ember.Handlebars.registerHelper('rating_helper', function(condition, options) {
    //alert(condition);
    var returnValue = '<div class="ember-view rating">';
    var rating = this.get('rating_value');
    for(var i = 5; i >= 1; i--) {
       returnValue = returnValue + '<span id="' + i + '" class';
       if(i == rating) {
          returnValue = returnValue + '="active"';
       }
       returnValue = returnValue + '></span>\n';
    }
    returnValue = returnValue + "\n</div></br>";
    return new Ember.Handlebars.SafeString(returnValue);
});

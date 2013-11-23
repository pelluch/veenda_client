App.LoginView = Ember.View.extend(
{
	templateName: 'login'
});
App.AyudaView = Ember.View.extend({
  isclose: function(key) {
    if(key.distance<210)
	{
		return true;
	}
	else
	{
    return false;
	}
  }
});
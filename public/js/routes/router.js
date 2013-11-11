App.Router.map(function() {
    this.resource('deliveries', function() {
      this.route('delivery', {path: ':delivery_id'});
    });

    this.route('login', {path: '/'});
	  this.route('ranking', {path: '/rankings/:order'});
});

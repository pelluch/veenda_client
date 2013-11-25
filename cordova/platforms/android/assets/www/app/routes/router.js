App.Router.map(function() {
    this.resource('orders', function() {
      this.route('order', {path: ':order_id'});
    });

    this.route('login', {path: '/'});
	  this.route('rating', {path: '/ratings/:order'});
});

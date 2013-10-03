App.Router.map(function() {
    this.resource('dispatched_orders', function() {
      this.route('dispatched_order', {path: ':dispatched_order_id'});
    });

    this.route('login', {path: '/'});
	  this.route('ranking', {path: '/rankings/:order'});
});

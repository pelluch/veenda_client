App = Ember.Application.create({
  // Para efectos de debugging
  LOG_TRANSITIONS: true
});

App.DispatchedOrderAdapter = DS.RESTAdapter.extend({
  host: 'http://veenda01.herokuapp.com',
  namespace: 'consumers/1'
});

App.Router.map(function() {
  this.resource('dispatched_order', { path: '/dispatched_orders/:dispatched_order_id' });
  this.route('login', {path: '/'});
});

// Se omite el '#' del URL
App.Router.reopen({
  location: 'history'
});

App.LoginController = Ember.Controller.extend({
  actions: {
      insert: function(event) {
        var dispatched_order = this.get('store').find('dispatched_order', this.get('codigo'));
        this.transitionToRoute('dispatched_order', dispatched_order);
      }
  }
});


App.DispatchedOrderController = Ember.ObjectController.extend({
  init: function() {

    var self = this;
    setInterval(function() {
      self.refreshMyData()
    }, 5000);
  },
  refreshMyData: function() {
  this.transitionToRoute('dispatched_order');
  }
  
});

App.DispatchedOrder = DS.Model.extend({
  name: DS.attr(),
  delivered: DS.attr(),
  rest: DS.attr()
});

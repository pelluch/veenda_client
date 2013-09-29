App = Ember.Application.create({
  // Para efectos de debugging
  LOG_TRANSITIONS: true,
  currentPath: '',
});

App.ApplicationController = Ember.Controller.extend({
  updateCurrentPath: function() {
    App.set('currentPath', this.get('currentPath'));
  }.observes('currentPath')
}),

App.DispatchedOrderAdapter = DS.RESTAdapter.extend({
  host: 'http://veenda01.herokuapp.com',
  namespace: 'consumers/1'
});

App.Router.map(function() {
  this.resource('dispatched_orders', function() {
    this.route('dispatched_order', {path: ':dispatched_order_id'});
  });
  //this.resource('dispatched_order', { path: '/dispatched_orders/:dispatched_order_id' });
  this.route('login', {path: '/'});
});

App.LoginController = Ember.Controller.extend({
  actions: {
      insert: function(event) {
        var dispatched_order = this.get('store').find('dispatched_order', this.get('codigo'));
        this.transitionToRoute('dispatched_orders.dispatched_order', dispatched_order);
      }
  }
});

App.DispatchedOrdersIndexRoute = Ember.Controller.extend({
    model: function() {
      models = this.get('store').find('dispatched_order');
      return models;
    }
});

App.DispatchedOrdersDispatchedOrderController = Ember.ObjectController.extend({
  init: function() {
    var self = this;
    setInterval(function() {
      self.refreshMyData()
    }, 5000);
  },
  refreshMyData: function(params) {
   this.transitionToRoute(App.get('currentPath'));
  }
  
});

App.DispatchedOrder = DS.Model.extend({
  name: DS.attr(),
  delivered: DS.attr(),
  rest: DS.attr(),
  dispatcher_latitude: DS.attr(),
  dispatcher_longitude: DS.attr(),
  destination_latitude: DS.attr(),
  destination_longitude: DS.attr(),
  dispatch_time: DS.attr()
});

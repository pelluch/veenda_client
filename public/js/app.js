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
    },
    insert: function(event) {
      var transaction = this.get('store').transaction();
          this.set('delivered', true);
          App.store.commit();
    }
});


//Google Map
App.Marker = Ember.Object.extend({
});
App.MapView = Ember.View.extend({

  didInsertElement: function(event) {
    var dispatcher_latitude = this.get('context').get('dispatcher_latitude');
    var dispatcher_longitude = this.get('context').get('dispatcher_longitude');
    var destination_latitude = this.get('context').get('destination_latitude');
    var destination_longitude = this.get('context').get('destination_longitude');

    console.log(dispatcher_latitude);
    console.log(dispatcher_longitude);
    console.log(destination_latitude);
    console.log(destination_longitude);
    
  }
});
// Close Google Map

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

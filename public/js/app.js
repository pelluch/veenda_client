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
    host: 'http://veenda01.herokuapp.com'
});

App.Router.map(function() {
    this.resource('dispatched_orders', function() {
      this.route('dispatched_order', {path: ':dispatched_order_id'});
    });
    //this.resource('dispatched_order', { path: '/dispatched_orders/:dispatched_order_id' });
    this.route('login', {path: '/'});
    this.route('dispatched_order-notfound');
});

App.LoginController = Ember.Controller.extend({
    actions: {
        insert: function(event) {
          var dispatched_order = this.get('store').find('dispatched_order', this.get('codigo'));
		  this.transitionToRoute('dispatched_orders.dispatched_order', dispatched_order);
		
        }
    }
});
App.DispatchedOrdersDispatchedOrderRoute = Ember.Route.extend( {
    actions: {
   // then this hook will be fired with the error and most importantly a Transition
   // object which you can use to retry the transition after you handled the error
   error: function(error, transition) {
		    this.route('dispatched_order-notfound');
	 
   }}
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
      
    }
});



App.DispatchedOrdersDispatchedOrderRoute = Ember.Route.extend( {
  actions: {
   // then this hook will be fired with the error and most importantly a Transition
   // object which you can use to retry the transition after you handled the error
    error: function(error, transition) {
      sendToWeb;
    },
    sendToWeb: function(event){
      console.log(2);
      this.transitionToRoute('dispatched_order-notfound');
    }
  }
});



//Google Map
App.Marker = Ember.Object.extend({
});
App.MapView = Ember.View.extend({
  id: 'map_canvas',
  tagName: 'div',
  attributeBindings: ['style'],
  style:"width:95%; height:400px",
  map:null,
  markers:[],
  distance:0,
  didInsertElement: function(event) {
    var dispatcher_latitude = this.get('context').get('dispatcher_latitude');
    var dispatcher_longitude = this.get('context').get('dispatcher_longitude');
    var destination_latitude = this.get('context').get('destination_latitude');
    var destination_longitude = this.get('context').get('destination_longitude');

    var mapOptions = {
      center: new google.maps.LatLng(dispatcher_latitude, dispatcher_longitude),
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var controller = this.get("controller");
    var map = new google.maps.Map(this.$().get(0),mapOptions);
    
    this.set("map",map);
    
    var that = this;
    
    var current_pos = new google.maps.LatLng(dispatcher_latitude, dispatcher_longitude);
    var end_pos = new google.maps.LatLng(destination_latitude, destination_longitude);
    var locationArray = [current_pos, end_pos];
    var locationNameArray = ['Posición Actual', 'Posición Llegada'];
    var locationColorArray = ['red', 'green'];

    distance = (google.maps.geometry.spherical.computeDistanceBetween(current_pos, end_pos) / 1000).toFixed(1);

    var coord;
    for (coord in locationArray) {
      new google.maps.Marker({
        position: locationArray[coord],
        map: map,
        title: locationNameArray[coord],
        icon: "http://maps.google.com/mapfiles/ms/icons/"+locationColorArray[coord]+"-dot.png"
      });
    }
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

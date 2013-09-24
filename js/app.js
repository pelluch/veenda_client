App = Ember.Application.create();

App.Store = DS.Store.extend({
  revision:12,
  adapter: 'DS.FixtureAdapter' // Se debe comentar esta linea y descomentar el texto de abajo!
   /*adapter: DS.RESTAdapter.extend({
    bulkCommit: false, 
    url: "http://veenda01.herokuapp.com",    
    buildURL: function(record, suffix) {
        var s = this._super(record, suffix);
        return s + ".json";
    }*/
  
})
});

App.Router.map(function() {
  this.resource('order', { path: 'order/:order_id'});
  this.resource('login');
});

App.IndexRoute = Ember.Route.extend({
  redirect: function () {
    this.transitionTo('login');
  }
});

App.LoginController = Ember.Controller.extend({
  insert: function(event) {
        var order = App.Order.find(this.get('codigo'));
        this.transitionTo('order', order);
  }
});

App.OrderRoute = Ember.Route.extend({
  model: function(params) {
    console.log(2);
    return App.Order.find(params.order_id);
  }
});

App.Order = DS.Model.extend({
  product: DS.attr('string'),
  turn: DS.attr('number')
});

 App.Pedido.FIXTURES = [{ // App.Pedido.FIXTURES = [{...}] Debe ser comentado si se activa la función REST de arriba
     id:1,
     product: "Pedido Anx3",
     turn:4
 },
 {
     id:2,
     product: "Pedio Ztk1",
     turn:2
}];

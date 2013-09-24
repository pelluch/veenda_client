App = Ember.Application.create();


App.CUSTOMAdapter = DS.RESTAdapter.extend({
  bulkCommit: false, 
  url: "localhost:3000",    
  buildURL: function(record, suffix) {
    var s = this._super(record, suffix);
    return s + ".json";
  }
})


App.Store = DS.Store.extend({
  revision:12,
  //adapter: 'DS.FixtureAdapter' // Se debe comentar esta linea y descomentar el texto de abajo!
   adapter: App.CUSTOMAdapter
  
});

App.Router.map(function() {
  this.resource('order', { path: 'orders/:order_id'});
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
        console.log(this.get('codigo'))
        console.log(order.product)

        this.transitionToRoute('order', order);
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


/*App.Order.FIXTURES = [{ // App.Order.FIXTURES = [{...}] Debe ser comentado si se activa la función REST de arriba
    id:1,
    name: "Order Anx3",
    rest:4
},
{
    id:2,
    name: "Pedio Ztk1",
    rest:2
}];*/
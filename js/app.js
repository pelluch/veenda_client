App = Ember.Application.create();

App.Store = DS.Store.extend({
  revision:12,
  adapter: 'DS.FixtureAdapter' // Se debe comentar esta linea y descomentar el texto de abajo!
  /* adapter: DS.RESTAdapter.extend({
    url: 'http://otipap.hol.es/veenda_client/'
  }) */ 
  
});

App.Router.map(function() {
  this.resource('pedido', { path: 'pedido/:pedido_id'});
  this.resource('login');
});

App.IndexRoute = Ember.Route.extend({
  redirect: function () {
    this.transitionTo('login');
  }
});

App.LoginController = Ember.Controller.extend({
  insert: function(event) {
        var pedido = App.Pedido.find(this.get('codigo'));
        this.transitionTo('pedido', pedido);
  }
});

App.PedidoRoute = Ember.Route.extend({
  model: function(params) {
    console.log(2);
    return App.Pedido.find(params.pedido_id);
  }
});

App.Pedido = DS.Model.extend({
  name: DS.attr('string'),
  rest: DS.attr('string')
});

App.Pedido.FIXTURES = [{ // App.Pedido.FIXTURES = [{...}] Debe ser comentado si se activa la función REST de arriba
    id:1,
    name: "Pedido Anx3",
    rest:4
},
{
    id:2,
    name: "Pedio Ztk1",
    rest:2
}];
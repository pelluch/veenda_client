App = Ember.Application.create();

App.Store = DS.Store.extend({
    revision: 12,
    //adapter: 'DS.RESTAdapter',
    adapter: DS.FixtureAdapter.extend({
        queryFixtures: function(fixtures, query, type) {
            console.log('Query: ' + query);
            console.log(type);
            return fixtures.filter(function(item) {
                for(prop in query) {
                    if( item[prop] != query[prop]) {
                        return false;
                    }
                }
                console.log('Found')
                return true;
            });
        }
    })
});

App.Router.map(function() {
  this.resource('pedido', { path: 'pedidos/:pedido_id'});
  this.resource('login', {path: '/'});
});


App.Pedido = DS.Model.extend({
  //id: DS.attr('number'),
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


App.LoginController = Ember.Controller.extend({
  actions: {
    insert: function(event) {
          var codigo = parseInt(this.get('codigo'));
          var pedido = this.store.find('pedido', {id : codigo}).then(function(value) {
             return value;
          });
          console.log('Here it is: ' + typeof(pedido));
          this.transitionToRoute('pedido', pedido.id);
    }
  }
});

App.PedidosRoute = Ember.Route.extend({
  model: function(params) {
    console.log(2);
    return this.store.find('pedido')
  }
});




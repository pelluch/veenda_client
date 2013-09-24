App = Ember.Application.create();

App.Store = DS.Store.extend({
  revision:12,
  adapter: 'DS.FixtureAdapter'
});

App.Router.map(function() {
  this.resource('pedido', { path: '/:pedido_id' });
  this.resource('login');
});

App.IndexRoute = Ember.Route.extend({
  redirect: function () {
    this.transitionTo('login');
  }
});

// ACÁ ESTÁ EL PROBLEMA!!!!!!
// La idea es que reciba el codigo del pedido desede el input y abra la ruta "pedido" asociada al id del pedido
// El problema es que se cae al intentar pasar a la ruta pedido
App.LoginController = Ember.Controller.extend({
  insert: function(event) {
        var codigo = this.get('codigo');
        var accountObj = App.Pedido.find(1);
        App.get('router').transitionTo('pedido');
  }
});

App.Pedido = DS.Model.extend({
  title: DS.attr('string'),
  author: DS.attr('string'),
  intro: DS.attr('string'),
  publishedAt: DS.attr('date')
});

App.Pedido.FIXTURES = [{
    id:1,
    title: "Mejoras de usabilidad en el ecommerce. Panama Jack",
    author: "elad",
    publishedAt: new Date('4-8-2013'),
    fullText: "..."
},
{
    id:2,
    title: "Introducción al framework Ember.js",
    author: "danii",
    publishedAt: new Date('4-3-2013'),
    fullText: "..."
}];
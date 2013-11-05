App.DispatchedOrdersDispatchedOrderRoute = Ember.Route.extend( {
  model: function(params) {

    var dispatched_order = this.get('store').find('dispatched_order', params.dispatched_order_id).then( function(order) {
    if(order.id != -1) {
      //alert(order.get('name'));
      var toSave = { key : params.dispatched_order_id, id: order.get('id'), name: order.get('name'), delivered: order.get('delivered'), rest: order.get('rest'), dispatch_time: order.get('dispatch_time'), distance: order.get('distance'),
       type : 'dispatched_order'};
      App.chair.save(toSave);

      return order;
    }
    return null;
    });


    return dispatched_order;
  },
  actions: {
    error: function(error, transition) {
      alert("No hay conexión de datos. Asegúrese de que está conectado a una red, diríjase a Configuración.");
      this.transitionToRoute('order_notfound');
    }
  }
});

App.DispatchedOrdersIndexRoute = Ember.Controller.extend({
  model: function() {
    models = this.get('store').find('dispatched_order');
    return models;
  }
});

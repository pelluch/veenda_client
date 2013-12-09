App.OrdersOrderRoute = Ember.Route.extend( {
  model: function(params) {
    

    var order = this.get('store').find('order', params.order_id).then( function(order) {
      console.log(order);
    if(order.id != -1) {
      //alert(order.get('name'));
      var toSave = { key : params.order_id, id: order.get('id'), name: order.get('name'), delivered: order.get('delivered'), 
      rest: order.get('rest'), dispatch_time: order.get('dispatch_time'), distance: order.get('distance'), 
      estimated_time: order.get('estimated_time'), delivery_id: order.get('delivery_id'), type : 'order'};
      App.chair.save(toSave);
      


      return order;
    }
    return null;
    });


    return order;
  },
  actions: {
    error: function(error, transition) {
      alert("No hay conexión de datos. Asegúrese de que está conectado a una red, diríjase a Configuración.");
      this.transitionToRoute('order_notfound');
    }
  }
});

App.OrdersIndexRoute = Ember.Controller.extend({
  model: function() {
    models = this.get('store').find('order');
    return models;
  }
});

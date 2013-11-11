App.DeliveriesDeliveryRoute = Ember.Route.extend( {
  model: function(params) {
    

    var delivery = this.get('store').find('delivery', params.delivery_id).then( function(order) {
    if(order.id != -1) {
      //alert(order.get('name'));
      var toSave = { key : params.delivery_id, id: order.get('id'), name: order.get('name'), delivered: order.get('delivered'), rest: order.get('rest'), dispatch_time: order.get('dispatch_time'), distance: order.get('distance'),
       type : 'delivery'};
      App.chair.save(toSave);


      return order;
    }
    return null;
    });


    return delivery;
  },
  actions: {
    error: function(error, transition) {
      alert("No hay conexión de datos. Asegúrese de que está conectado a una red, diríjase a Configuración.");
      this.transitionToRoute('order_notfound');
    }
  }
});

App.DeliveriesIndexRoute = Ember.Controller.extend({
  model: function() {
    models = this.get('store').find('delivery');
    return models;
  }
});

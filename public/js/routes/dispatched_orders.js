App.DispatchedOrdersDispatchedOrderRoute = Ember.Route.extend( {
  model: function(params) {
    //alert('tf');
    //alert(order.get('isError'));
    var dispatched_order = this.get('store').find('dispatched_order', params.dispatched_order_id).then( function(order) {
      if(order.id != -1) {
        //alert(order.get('name'));
        var toSave = { key : params.dispatched_order_id, name: order.get('name'), delivered: order.get('delivered')};
        store.save(toSave);
        return order;
      }
      return null;
    });
    return dispatched_order;
  },
  actions: {
    // then this hook will be fired with the error and most importantly a Transition
    // object which you can use to retry the transition after you handled the error
    error: function(error, transition) {
      alert(error);
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

App.MapView = Ember.View.extend({
  id: 'map_canvas',
  tagName: 'div',
  attributeBindings: ['style'],
  style:"margin-left:auto; height: 320px",
  map:null,
  markers:[],
  didInsertElement: function(event) {

    var dispatcher_latitude = this.get('context').get('dispatcher_latitude');
    var dispatcher_longitude = this.get('context').get('dispatcher_longitude');
    var destination_latitude = this.get('context').get('destination_latitude');
    var destination_longitude = this.get('context').get('destination_longitude');

    var current_pos = new google.maps.LatLng(dispatcher_latitude, dispatcher_longitude);
    var end_pos = new google.maps.LatLng(destination_latitude, destination_longitude);
    var locationArray = [current_pos, end_pos];
    var locationNameArray = ['Posición Actual', 'Posición Llegada'];
    var locationColorArray = ['red', 'green'];

    var distance = this.get('context').get('distance', distance);

    var mapOptions = {
      center: new google.maps.LatLng(destination_latitude, destination_longitude),
      zoom: 9,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(this.$().get(0),mapOptions);
    
    this.set("map", map);
    
    //alert(distance);
    var coord;
    for (var coord = 1; coord < 2; coord++) {
      var image = new google.maps.MarkerImage("img/gps-icon.png",
        new google.maps.Size(60, 60),
        new google.maps.Point(0,0),
        new google.maps.Point(19, 19)
        );
      var mkr = new google.maps.Marker({
        position: locationArray[coord],
        map: map,
        title: locationNameArray[coord],
        icon: image
      });
      var circleOptions = {
        strokeColor: '#37b4f0',
        strokeOpacity: 0.3,
        strokeWeight: 1,
        fillColor: '#58d2ff',
        fillOpacity: 0.25,
        map: map,
        center: locationArray[coord],
        radius: distance*54
      };
      // Add the circle for this city to the map.
      cityCircle = new google.maps.Circle(circleOptions);
    }
    
    var self = this;
    setInterval(function(event) 
    { 
      /*var dispatcher_latitude = self.get('context').get('dispatcher_latitude');
      var dispatcher_longitude = self.get('context').get('dispatcher_longitude');
      var current_pos2 = new google.maps.LatLng(dispatcher_latitude, dispatcher_longitude);
      mkr.setPosition(current_pos2);*/
      var distances = self.get('context').get('distance');
      cityCircle.set('radius', distances*54 );

    }, 
    2000);
    return distance;
  },
});

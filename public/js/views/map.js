App.MapView = Ember.View.extend({
  id: 'map_canvas',
  tagName: 'div',
  attributeBindings: ['style'],
  style:"margin-left:auto; height: 400px",
  map:null,
  markers:[],
  didInsertElement: function(event) {

    var dispatcher_latitude = this.get('context').get('dispatcher_latitude');
    var dispatcher_longitude = this.get('context').get('dispatcher_longitude');
    var destination_latitude = this.get('context').get('destination_latitude');
    var destination_longitude = this.get('context').get('destination_longitude');

    var mapOptions = {
      center: new google.maps.LatLng(dispatcher_latitude, dispatcher_longitude),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
	var controller = this.get("controller");
    var map = new google.maps.Map(this.$().get(0),mapOptions);
	
    
    this.set("map", map);
    
    var that = this;
    
    var current_pos = new google.maps.LatLng(dispatcher_latitude, dispatcher_longitude);
    var end_pos = new google.maps.LatLng(destination_latitude, destination_longitude);
    var locationArray = [current_pos, end_pos];
    var locationNameArray = ['Posición Actual', 'Posición Llegada'];
    var locationColorArray = ['red', 'green'];

    var distance = Math.floor((google.maps.geometry.spherical.computeDistanceBetween(current_pos, end_pos) / 1000).toFixed(1));
    this.get('context').set('distance', distance);
    //alert(distance);
    var coord;
    for (var coord = 0; coord < 2; coord++) {
      var image = new google.maps.MarkerImage("gps-icon.png",
          new google.maps.Size(60, 60),
          new google.maps.Point(0,0),
          new google.maps.Point(19, 19)
      );
      new google.maps.Marker({
        position: locationArray[coord],
        map: map,
        title: locationNameArray[coord],
        icon: image
      });
      var populationOptions = {
        strokeColor: '#37b4f0',
        strokeOpacity: 0.3,
        strokeWeight: 1,
        fillColor: '#58d2ff',
        fillOpacity: 0.25,
        map: map,
        center: locationArray[coord],
        radius: 200
      };
      // Add the circle for this city to the map.
      cityCircle = new google.maps.Circle(populationOptions);
    }
    return distance;
  },
});

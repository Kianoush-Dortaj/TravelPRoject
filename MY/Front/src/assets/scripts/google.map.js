function loadMap() {

  var mapOptions = {
      center: new google.maps.LatLng(20.593684, 78.96288),
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var map = new google.maps.Map(document.getElementById("sample"), mapOptions);
}

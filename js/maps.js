let map, directionsService, directionsRenderer;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 52.3702, lng: 4.8952 },
    zoom: 12,
    disableDefaultUI: true
  });

  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);

  const fromInput = document.getElementById("from");
  const toInput = document.getElementById("to");

  new google.maps.places.Autocomplete(fromInput, { types: ["address"] });
  new google.maps.places.Autocomplete(toInput, { types: ["address"] });
}

function drawRoute(from, to) {
  directionsService.route({
    origin: from,
    destination: to,
    travelMode: "DRIVING"
  }, (result, status) => {
    if (status === "OK") {
      directionsRenderer.setDirections(result);
    }
  });
}

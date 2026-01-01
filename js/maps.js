let map, routeLayer;

function initMap() {
  map = L.map("map").setView([52.37, 4.89], 12);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap"
  }).addTo(map);
}

async function geocode(address) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
  );
  const data = await res.json();
  return data[0];
}

async function drawRoute(from, to) {
  const start = await geocode(from);
  const end = await geocode(to);

  if (!start || !end) return;

  if (routeLayer) map.removeLayer(routeLayer);

  routeLayer = L.polyline([
    [start.lat, start.lon],
    [end.lat, end.lon]
  ], { color: "yellow" }).addTo(map);

  map.fitBounds(routeLayer.getBounds());
}

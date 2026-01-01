let map, routeLayer;

function initMap() {
  map = L.map("map").setView([52.37, 4.89], 12);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap"
  }).addTo(map);

  setupAutocomplete("from");
  setupAutocomplete("to");
}

async function searchAddress(query) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
  );
  return await res.json();
}

function setupAutocomplete(inputId) {
  const input = document.getElementById(inputId);
  const list = document.createElement("div");
  list.style.position = "absolute";
  list.style.background = "#222";
  list.style.borderRadius = "10px";
  list.style.zIndex = "1000";
  list.style.width = "100%";
  list.style.marginTop = "5px";
  input.parentNode.appendChild(list);

  input.addEventListener("input", async () => {
    list.innerHTML = "";
    if (input.value.length < 3) return;

    const results = await searchAddress(input.value);
    results.slice(0, 5).forEach(r => {
      const item = document.createElement("div");
      item.style.padding = "10px";
      item.style.cursor = "pointer";
      item.innerText = r.display_name;
      item.onclick = () => {
        input.value = r.display_name;
        list.innerHTML = "";
      };
      list.appendChild(item);
    });
  });
}

async function drawRoute(from, to) {
  const start = await searchAddress(from);
  const end = await searchAddress(to);
  if (!start[0] || !end[0]) return;

  if (routeLayer) map.removeLayer(routeLayer);

  routeLayer = L.polyline([
    [start[0].lat, start[0].lon],
    [end[0].lat, end[0].lon]
  ], { color: "yellow" }).addTo(map);

  map.fitBounds(routeLayer.getBounds());
}

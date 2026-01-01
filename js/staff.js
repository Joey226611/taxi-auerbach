if (Notification.permission !== "granted") {
  Notification.requestPermission();
}

function render() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  getReservations().forEach(r => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <b>${r.from} → ${r.to}</b><br>
      ⏰ ${new Date(r.time).toLocaleString()}<br>
      Status: ${r.status}

      <button onclick="setStatus(${r.id}, 'Onderweg')">Taxi onderweg</button>
      <button class="secondary" onclick="setStatus(${r.id}, 'Voltooid')">Rit klaar</button>
    `;

    list.appendChild(div);
  });
}

function setStatus(id, status) {
  const res = getReservations();
  const r = res.find(x => x.id === id);
  if (!r) return;

  r.status = status;
  saveReservations(res);

  notify("Taxi status", `Rit is nu: ${status}`);
  render();
}

window.addEventListener("storage", () => {
  notify("Nieuwe reservering", "Er is een nieuwe rit binnengekomen 🚕");
  render();
});

render();

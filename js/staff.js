if (Notification.permission !== "granted") {
  Notification.requestPermission();
}

function render() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  getReservations().forEach(r => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <b>${r.from} → ${r.to}</b><br>
      ⏰ ${new Date(r.time).toLocaleString()}<br>
      Status: ${r.status}

      <button onclick="setStatus(${r.id}, 'Onderweg')">Taxi onderweg</button>
      <button class="secondary" onclick="setStatus(${r.id}, 'Voltooid')">Rit voltooid</button>
    `;

    list.appendChild(card);
  });
}

function setStatus(id, status) {
  let res = getReservations();

  if (status === "Voltooid") {
    res = res.filter(r => r.id !== id);
    saveReservations(res);
    notify("Rit afgerond", "Rit voltooid en verwijderd ✅");
    render();
    return;
  }

  const r = res.find(x => x.id === id);
  if (!r) return;

  r.status = status;
  saveReservations(res);

  notify("Taxi onderweg", "Taxi is onderweg 🚕");
  render();
}

window.addEventListener("storage", () => {
  notify("Nieuwe reservering", "Nieuwe rit binnengekomen 🚕");
  render();
});

render();

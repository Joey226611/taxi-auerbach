if (Notification.permission !== "granted") {
  Notification.requestPermission();
}

function reserve() {
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const time = document.getElementById("time").value;

  if (!from || !to || !time) return;

  const reservations = getReservations();

  reservations.push({
    id: Date.now(),
    from,
    to,
    time,
    status: "Ingepland"
  });

  saveReservations(reservations);

  notify("Taxi Auerbach", "Je reservering is geplaatst 🚕");

  document.getElementById("status").innerText =
    "Reservering verzonden. Wacht op bevestiging.";
}

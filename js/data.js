const STORAGE_KEY = "auerbach_reservations";

function getReservations() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

function saveReservations(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function notify(title, body) {
  if (Notification.permission === "granted") {
    new Notification(title, { body });
  }
}

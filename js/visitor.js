import { supabase } from "./supabase.js";

if (Notification.permission !== "granted") {
  Notification.requestPermission();
}

async function reserve() {
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const time = document.getElementById("time").value;

  if (!from || !to || !time) return;

  drawRoute(from, to);

  await supabase.from("reservations").insert([{
    from,
    to,
    time,
    status: "Ingepland"
  }]);

  new Notification("Taxi Auerbach", {
    body: "Je reservering is geplaatst 🚕"
  });

  document.getElementById("status").innerText =
    "Reservering verzonden. Staff ziet dit direct.";
}

window.reserve = reserve;

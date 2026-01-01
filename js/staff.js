import { supabase } from "./supabase.js";

if (Notification.permission !== "granted") {
  Notification.requestPermission();
}

async function loadReservations() {
  const { data } = await supabase
    .from("reservations")
    .select("*")
    .order("time");

  render(data || []);
}

function render(reservations) {
  const list = document.getElementById("list");
  list.innerHTML = "";

  reservations.forEach(r => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <b>${r.from} → ${r.to}</b><br>
      ⏰ ${new Date(r.time).toLocaleString()}<br>
      Status: ${r.status}

      <button onclick="openNavigation('${r.from}','${r.to}')">
        📍 Bekijk route
      </button>

      <button onclick="setStatus(${r.id}, 'Onderweg')">
        Taxi onderweg
      </button>

      <button class="secondary" onclick="setStatus(${r.id}, 'Voltooid')">
        Rit voltooid
      </button>
    `;

    list.appendChild(card);
  });
}

async function setStatus(id, status) {
  if (status === "Voltooid") {
    await supabase.from("reservations").delete().eq("id", id);
    new Notification("Rit afgerond", { body: "Rit is voltooid ✅" });
    return;
  }

  await supabase
    .from("reservations")
    .update({ status })
    .eq("id", id);
}

function openNavigation(from, to) {
  const url =
    `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(from)}&destination=${encodeURIComponent(to)}`;
  window.open(url, "_blank");
}

/* 🔴 REALTIME LISTENER */
supabase
  .channel("realtime-reservations")
  .on(
    "postgres_changes",
    { event: "*", schema: "public", table: "reservations" },
    () => loadReservations()
  )
  .subscribe();

window.setStatus = setStatus;
window.openNavigation = openNavigation;

loadReservations();

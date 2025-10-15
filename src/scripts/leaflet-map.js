import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Initialize map after DOM is ready
const init = () => {
  const mapEl = document.getElementById("map");
  if (!mapEl) return;

  const map = L.map("map").setView([46.6033, 1.883], 6);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

  // Chargement dynamique du JSON (from public folder)
  fetch("/listeEtablissements.json")
    .then((response) => response.json())
    .then((listeEtablissements) => {
      listeEtablissements.forEach(({ lat, lon,name }) => {
        L.marker([lat, lon]).addTo(map).bindPopup(name);
      });
    })
    .catch((error) => {
      console.error("Erreur lors du chargement des établissements :", error);
    });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

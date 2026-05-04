const routeUrls = [
  "data/camino-frances.geojson",
  "https://gist.githubusercontent.com/reinvented/d7a78556f69be952b3cb96f992f49743/raw/caminofrances.geojson",
];

const stages = [
  {
    day: 1,
    from: "Logroño",
    to: "Burgos",
    sleep: "Burgos",
    km: 120.7,
    up: 1467,
    down: 968,
    difficulty: "Alta",
    indexHint: 695,
    color: "#0f766e",
    note: "Salida entre viñedos riojanos, Montes de Oca y entrada urbana a Burgos. Jornada larga, mejor madrugar.",
  },
  {
    day: 2,
    from: "Burgos",
    to: "Sahagún",
    sleep: "Sahagún",
    km: 122.2,
    up: 705,
    down: 775,
    difficulty: "Media",
    indexHint: 1001,
    color: "#4f7f31",
    note: "Meseta castellana: pocos desniveles, viento posible y tramos expuestos. Gestiona agua y sol.",
  },
  {
    day: 3,
    from: "Sahagún",
    to: "Astorga",
    sleep: "Astorga",
    km: 107.0,
    up: 514,
    down: 463,
    difficulty: "Media",
    indexHint: 1197,
    color: "#a2a12b",
    note: "Etapa de transición por León y Hospital de Órbigo. Conviene cruzar León temprano.",
  },
  {
    day: 4,
    from: "Astorga",
    to: "Villafranca del Bierzo",
    sleep: "Villafranca del Bierzo",
    km: 73.2,
    up: 946,
    down: 1300,
    difficulty: "Alta",
    indexHint: 1335,
    color: "#d99424",
    note: "Cruz de Ferro, bajada a Molinaseca y Bierzo. Menos kilómetros, más técnica y atención en descensos.",
  },
  {
    day: 5,
    from: "Villafranca del Bierzo",
    to: "Sarria",
    sleep: "Sarria",
    km: 65.9,
    up: 1445,
    down: 1514,
    difficulty: "Muy alta",
    indexHint: 1521,
    color: "#c85536",
    note: "Día reina: subida a O Cebreiro y terreno gallego. Reserva margen de tiempo y revisa meteorología.",
  },
  {
    day: 6,
    from: "Sarria",
    to: "Arzúa",
    sleep: "Arzúa",
    km: 74.1,
    up: 1051,
    down: 1117,
    difficulty: "Alta",
    indexHint: 1749,
    color: "#9b4f86",
    note: "Mucho sube y baja entre bosques, aldeas y cruces con peregrinos a pie desde Sarria.",
  },
  {
    day: 7,
    from: "Arzúa",
    to: "Santiago de Compostela",
    sleep: "Santiago de Compostela",
    km: 36.5,
    up: 399,
    down: 532,
    difficulty: "Media",
    indexHint: 1969,
    color: "#3867b7",
    note: "Jornada corta para entrar con calma por Monte do Gozo y llegar a la Catedral sin prisa.",
  },
];

const stopPoints = [
  { name: "Logroño", role: "Salida", coordinates: [-2.4457, 42.465] },
  { name: "Burgos", role: "Noche 1", coordinates: [-3.704, 42.3439] },
  { name: "Sahagún", role: "Noche 2", coordinates: [-5.0293, 42.3714] },
  { name: "Astorga", role: "Noche 3", coordinates: [-6.058, 42.4588] },
  { name: "Villafranca del Bierzo", role: "Noche 4", coordinates: [-6.807, 42.606] },
  { name: "Sarria", role: "Noche 5", coordinates: [-7.4145, 42.78] },
  { name: "Arzúa", role: "Noche 6", coordinates: [-8.1648, 42.9284] },
  { name: "Santiago de Compostela", role: "Meta", coordinates: [-8.5448, 42.8806] },
];

const fallbackLine = stopPoints.map((point) => point.coordinates);

let map;
let allBounds;
let stageLayers = [];
let stageCasings = [];
let fullRouteLayer;
let selectedDay = 1;
let showingAll = true;
let routePane;

init();

async function init() {
  renderStageCards();
  renderElevationBars();
  initMap();
  initShell();

  try {
    const geojson = window.CAMINO_FRANCES_GEOJSON || (await fetchCaminoGeojson());
    const routeCoordinates = flattenCoordinates(geojson);
    drawRoute(routeCoordinates);
    setMapStatus("Traza cargada. Capas disponibles: IGN PNOA Satélite, IGN Topográfico y Relieve sombreado.");
  } catch (error) {
    drawFallbackRoute();
    setMapStatus("No se pudo cargar la traza detallada. Se muestra una ruta simplificada por ciudades.");
    console.warn("No se pudo cargar la traza detallada. Se usa una línea simplificada.", error);
  }
}

function initMap() {
  const standardMap = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
    maxZoom: 19,
    detectRetina: true,
  });

  const lightMap = L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    attribution: "&copy; OpenStreetMap &copy; CARTO",
    maxZoom: 20,
    detectRetina: true,
  });

  const ignTopoMap = L.tileLayer(
    "https://www.ign.es/wmts/mapa-raster?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=MTN&STYLE=default&TILEMATRIXSET=GoogleMapsCompatible&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image/jpeg",
    {
      attribution: "Mapa &copy; IGN España",
      maxZoom: 18,
      crossOrigin: true,
      detectRetina: true,
    },
  );

  const esriTopoMap = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
    {
      attribution: "Tiles &copy; Esri, OpenStreetMap contributors",
      maxZoom: 19,
      detectRetina: true,
    },
  );

  const ignSatelliteMap = L.tileLayer(
    "https://www.ign.es/wmts/pnoa-ma?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=OI.OrthoimageCoverage&STYLE=default&TILEMATRIXSET=GoogleMapsCompatible&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image/jpeg",
    {
      attribution: "PNOA &copy; IGN España",
      maxZoom: 19,
      crossOrigin: true,
      detectRetina: true,
    },
  );

  const esriSatelliteMap = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
      attribution: "Tiles &copy; Esri",
      maxZoom: 19,
      detectRetina: true,
    },
  );

  const shadedReliefBase = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/Elevation/World_Hillshade/MapServer/tile/{z}/{y}/{x}",
    {
      attribution: "Relieve &copy; Esri",
      maxZoom: 16,
      detectRetina: true,
    },
  );

  const hillshadeOverlay = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/Elevation/World_Hillshade/MapServer/tile/{z}/{y}/{x}",
    {
      attribution: "Relieve &copy; Esri",
      maxZoom: 16,
      opacity: 0.3,
      detectRetina: true,
    },
  );

  const labelsOverlay = L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png",
    {
      attribution: "&copy; OpenStreetMap &copy; CARTO",
      maxZoom: 20,
      pane: "labels",
      detectRetina: true,
    },
  );

  const baseLayers = {
    "Claro": lightMap,
    "OpenStreetMap": standardMap,
    "IGN Topográfico": ignTopoMap,
    "Esri Topográfico": esriTopoMap,
    "IGN PNOA Satélite": ignSatelliteMap,
    "Esri Satélite": esriSatelliteMap,
    "Relieve sombreado": shadedReliefBase,
  };

  const overlayLayers = {
    "Sombreado de relieve": hillshadeOverlay,
    "Etiquetas sobre satélite": labelsOverlay,
  };

  map = L.map("map", {
    layers: [lightMap],
    scrollWheelZoom: true,
    zoomControl: true,
    preferCanvas: true,
  }).setView([42.65, -5.45], 7);

  map.createPane("labels");
  map.getPane("labels").style.zIndex = 430;
  map.getPane("labels").style.pointerEvents = "none";

  routePane = map.createPane("route");
  routePane.style.zIndex = 460;

  const collapseLayers = window.matchMedia("(max-width: 759px)").matches;
  L.control.layers(baseLayers, overlayLayers, { collapsed: collapseLayers, position: "topright" }).addTo(map);
  requestAnimationFrame(() => map.invalidateSize());

  const stopsLayer = L.layerGroup();
  stopPoints.forEach((point, index) => {
    L.marker([point.coordinates[1], point.coordinates[0]], {
      icon: L.divIcon({
        className: "",
        html: `<span class="stop-marker">${index === 0 ? "S" : index === stopPoints.length - 1 ? "M" : index}</span>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      }),
    })
      .bindPopup(`<p class="popup-title">${point.name}</p><p class="popup-text">${point.role}</p>`)
      .addTo(stopsLayer);
  });
  stopsLayer.addTo(map);

  document.getElementById("fit-route").addEventListener("click", () => {
    if (allBounds) map.fitBounds(allBounds, { padding: [28, 28] });
  });

  document.getElementById("toggle-all").addEventListener("click", () => {
    showingAll = !showingAll;
    updateVisibleStages();
  });
}

async function fetchCaminoGeojson() {
  const errors = [];
  for (const url of routeUrls) {
    try {
      const response = await fetch(url, { cache: "no-cache" });
      if (!response.ok) throw new Error(`Respuesta ${response.status}`);
      return response.json();
    } catch (error) {
      errors.push(`${url}: ${error.message}`);
    }
  }
  throw new Error(errors.join(" | "));
}

function flattenCoordinates(geojson) {
  const coordinates = [];
  geojson.features.forEach((feature) => {
    feature.geometry.coordinates.forEach((coordinate) => {
      const last = coordinates[coordinates.length - 1];
      if (!last || last[0] !== coordinate[0] || last[1] !== coordinate[1]) {
        coordinates.push([coordinate[0], coordinate[1]]);
      }
    });
  });
  return coordinates;
}

function drawRoute(routeCoordinates) {
  const indexedStops = stopPoints.map((stop) => ({
    ...stop,
    routeIndex: nearestIndex(routeCoordinates, stop.coordinates),
  }));

  const start = indexedStops[0].routeIndex;
  const end = indexedStops[indexedStops.length - 1].routeIndex;
  const caminoSlice = routeCoordinates.slice(start, end + 1);
  const fullLatLngs = toLatLngs(caminoSlice);

  fullRouteLayer = L.polyline(fullLatLngs, {
    color: "#ffffff",
    opacity: 0.8,
    weight: 13,
    pane: "route",
    lineCap: "round",
    lineJoin: "round",
  }).addTo(map);

  stageLayers = stages.map((stage, index) => {
    const stageStart = indexedStops[index].routeIndex;
    const stageEnd = indexedStops[index + 1].routeIndex;
    const coordinates = routeCoordinates.slice(stageStart, stageEnd + 1);
    const casing = L.polyline(toLatLngs(coordinates), {
      color: "#ffffff",
      weight: 12,
      opacity: 0.95,
      pane: "route",
      lineCap: "round",
      lineJoin: "round",
      interactive: false,
    }).addTo(map);
    const layer = L.polyline(toLatLngs(coordinates), {
      color: stage.color,
      weight: 7,
      opacity: 0.98,
      pane: "route",
      lineCap: "round",
      lineJoin: "round",
    }).bindPopup(stagePopup(stage));
    layer.stageDay = stage.day;
    casing.stageDay = stage.day;
    layer.addTo(map);
    layer.on("click", () => selectStage(stage.day, true));
    stageCasings.push(casing);
    return layer;
  });

  allBounds = L.latLngBounds(fullLatLngs);
  map.fitBounds(allBounds, { padding: [28, 28] });
  selectStage(1, false);
}

function drawFallbackRoute() {
  fullRouteLayer = L.polyline(toLatLngs(fallbackLine), {
    color: "#ffffff",
    opacity: 0.85,
    weight: 13,
    pane: "route",
  }).addTo(map);

  stageLayers = stages.map((stage, index) => {
    const casing = L.polyline(toLatLngs([fallbackLine[index], fallbackLine[index + 1]]), {
      color: "#ffffff",
      weight: 12,
      opacity: 0.95,
      pane: "route",
      interactive: false,
    }).addTo(map);
    const layer = L.polyline(toLatLngs([fallbackLine[index], fallbackLine[index + 1]]), {
      color: stage.color,
      weight: 7,
      opacity: 0.98,
      pane: "route",
    }).bindPopup(stagePopup(stage));
    layer.stageDay = stage.day;
    casing.stageDay = stage.day;
    layer.addTo(map);
    layer.on("click", () => selectStage(stage.day, true));
    stageCasings.push(casing);
    return layer;
  });

  allBounds = L.latLngBounds(toLatLngs(fallbackLine));
  map.fitBounds(allBounds, { padding: [28, 28] });
  selectStage(1, false);
}

function nearestIndex(routeCoordinates, point) {
  let bestIndex = 0;
  let bestDistance = Infinity;
  routeCoordinates.forEach((coordinate, index) => {
    const distance = haversineKm(coordinate, point);
    if (distance < bestDistance) {
      bestDistance = distance;
      bestIndex = index;
    }
  });
  return bestIndex;
}

function toLatLngs(coordinates) {
  return coordinates.map(([lng, lat]) => [lat, lng]);
}

function selectStage(day, focusMap) {
  selectedDay = day;
  document.querySelectorAll(".stage-card").forEach((card) => {
    card.classList.toggle("active", Number(card.dataset.day) === selectedDay);
  });

  stageLayers.forEach((layer) => {
    const isSelected = layer.stageDay === selectedDay;
    layer.setStyle({
      weight: isSelected ? 10 : 7,
      opacity: showingAll || isSelected ? (isSelected ? 1 : 0.72) : 0,
    });
    if (isSelected) layer.bringToFront();
  });

  stageCasings.forEach((layer) => {
    const isSelected = layer.stageDay === selectedDay;
    layer.setStyle({
      weight: isSelected ? 16 : 12,
      opacity: showingAll || isSelected ? (isSelected ? 1 : 0.78) : 0,
    });
    if (isSelected) layer.bringToFront();
  });

  const selectedLayer = stageLayers[selectedDay - 1];
  if (selectedLayer) selectedLayer.bringToFront();

  const stage = stages.find((item) => item.day === selectedDay);
  if (focusMap && stage) {
    const layer = stageLayers[selectedDay - 1];
    map.fitBounds(layer.getBounds(), { padding: [34, 34] });
    layer.openPopup();
  }
}

function updateVisibleStages() {
  document.getElementById("toggle-all").textContent = showingAll ? "Solo activa" : "Mostrar todas";
  selectStage(selectedDay, false);
}

function setMapStatus(message) {
  const status = document.getElementById("map-status");
  if (status) status.textContent = message;
}

function renderStageCards() {
  const list = document.getElementById("stage-list");
  list.innerHTML = stages
    .map(
      (stage) => `
        <article class="stage-card" data-day="${stage.day}" style="--stage-color: ${stage.color}">
          <div class="stage-topline">
            <span>Día ${stage.day}</span>
            <span>${stage.difficulty}</span>
          </div>
          <h3>${stage.from} - ${stage.to}</h3>
          <p class="stage-route">Dormir en ${stage.sleep}</p>
          <div class="kpi-grid">
            <div class="kpi"><span>Kilómetros</span><strong>${formatKm(stage.km)}</strong></div>
            <div class="kpi"><span>Desnivel +</span><strong>${formatMeters(stage.up)}</strong></div>
            <div class="kpi"><span>Desnivel -</span><strong>${formatMeters(stage.down)}</strong></div>
          </div>
          <p class="stage-note">${stage.note}</p>
        </article>
      `,
    )
    .join("");

  document.querySelectorAll(".stage-card").forEach((card) => {
    card.addEventListener("click", () => selectStage(Number(card.dataset.day), true));
  });
}

function renderElevationBars() {
  const maxUp = Math.max(...stages.map((stage) => stage.up));
  const bars = document.getElementById("elevation-bars");
  bars.innerHTML = stages
    .map((stage) => {
      const width = Math.max(8, Math.round((stage.up / maxUp) * 100));
      return `
        <div class="bar-row">
          <span class="bar-label">Día ${stage.day}</span>
          <div class="bar-track" aria-hidden="true">
            <div class="bar-fill" style="width:${width}%;"></div>
          </div>
          <span class="bar-value">${formatMeters(stage.up)}</span>
        </div>
      `;
    })
    .join("");
}

function stagePopup(stage) {
  return `
    <p class="popup-title">Día ${stage.day}: ${stage.from} - ${stage.to}</p>
    <p class="popup-text">${formatKm(stage.km)} · +${formatMeters(stage.up)} · dormir en ${stage.sleep}</p>
  `;
}

function haversineKm(a, b) {
  const radius = 6371;
  const toRad = (value) => (value * Math.PI) / 180;
  const dLat = toRad(b[1] - a[1]);
  const dLng = toRad(b[0] - a[0]);
  const lat1 = toRad(a[1]);
  const lat2 = toRad(b[1]);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * radius * Math.asin(Math.sqrt(h));
}

function formatKm(value) {
  return `${value.toLocaleString("es-ES", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} km`;
}

function formatMeters(value) {
  return `${value.toLocaleString("es-ES")} m`;
}

function initShell() {
  const tabs = document.querySelectorAll(".tab");
  const sheet = document.getElementById("sheet");
  const sheetTitle = document.getElementById("sheet-title");
  const sheetClose = document.getElementById("sheet-close");
  const sheetBackdrop = document.getElementById("sheet-backdrop");
  const views = document.querySelectorAll(".view");

  const titles = {
    plan: "Plan diario",
    kpis: "KPIs y resumen",
    carga: "Carga física",
  };

  function setActiveTab(view) {
    tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.view === view));
  }

  function openSheet(view) {
    views.forEach((section) => section.classList.toggle("active", section.dataset.view === view));
    sheetTitle.textContent = titles[view] || "";
    sheet.classList.add("open");
    sheet.setAttribute("aria-hidden", "false");
    document.body.classList.add("sheet-open");
    setActiveTab(view);
    sheet.querySelector(".sheet-body").scrollTo(0, 0);
    requestAnimationFrame(() => map && map.invalidateSize());
    setTimeout(() => map && map.invalidateSize(), 320);
  }

  function closeSheet() {
    sheet.classList.remove("open");
    sheet.setAttribute("aria-hidden", "true");
    document.body.classList.remove("sheet-open");
    setActiveTab("mapa");
    requestAnimationFrame(() => map && map.invalidateSize());
    setTimeout(() => map && map.invalidateSize(), 320);
  }

  document.getElementById("stage-list").addEventListener("click", (event) => {
    if (!event.target.closest(".stage-card")) return;
    if (window.matchMedia("(max-width: 759px)").matches) {
      setTimeout(closeSheet, 220);
    }
  });

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const view = tab.dataset.view;
      if (view === "mapa") {
        closeSheet();
      } else if (sheet.classList.contains("open") && sheet.dataset.view === view) {
        closeSheet();
      } else {
        sheet.dataset.view = view;
        openSheet(view);
      }
    });
  });

  sheetClose.addEventListener("click", closeSheet);
  sheetBackdrop.addEventListener("click", closeSheet);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && sheet.classList.contains("open")) closeSheet();
  });

  setActiveTab("mapa");
}

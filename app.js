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

// Perfil de altimetría aproximado del Camino Francés (puntos clave por km acumulado).
const elevationProfile = [
  { km: 0, m: 384, label: "Logroño" },
  { km: 30, m: 485, label: "Nájera" },
  { km: 50, m: 645, label: "Santo Domingo" },
  { km: 70, m: 770, label: "Belorado" },
  { km: 88, m: 1150, label: "Montes de Oca" },
  { km: 105, m: 950, label: "Atapuerca" },
  { km: 120.7, m: 860, label: "Burgos" },
  { km: 145, m: 825, label: "Hornillos" },
  { km: 165, m: 800, label: "Castrojeriz" },
  { km: 190, m: 780, label: "Frómista" },
  { km: 210, m: 830, label: "Carrión" },
  { km: 242.9, m: 822, label: "Sahagún" },
  { km: 280, m: 800, label: "Mansilla" },
  { km: 300, m: 837, label: "León" },
  { km: 332, m: 825, label: "Hospital de Órbigo" },
  { km: 349.9, m: 870, label: "Astorga" },
  { km: 372, m: 1150, label: "Rabanal" },
  { km: 388, m: 1505, label: "Cruz de Ferro" },
  { km: 397, m: 1145, label: "El Acebo" },
  { km: 410, m: 595, label: "Molinaseca" },
  { km: 416, m: 545, label: "Ponferrada" },
  { km: 423.1, m: 510, label: "Villafranca del Bierzo" },
  { km: 435, m: 580, label: "Trabadelo" },
  { km: 444, m: 630, label: "Vega de Valcarce" },
  { km: 460, m: 1290, label: "O Cebreiro" },
  { km: 475, m: 660, label: "Triacastela" },
  { km: 489, m: 440, label: "Sarria" },
  { km: 510, m: 350, label: "Portomarín" },
  { km: 535, m: 565, label: "Palas de Rei" },
  { km: 550, m: 450, label: "Melide" },
  { km: 563.1, m: 390, label: "Arzúa" },
  { km: 583, m: 290, label: "O Pedrouzo" },
  { km: 595, m: 380, label: "Monte do Gozo" },
  { km: 599.6, m: 260, label: "Santiago de Compostela" },
];

const stageBoundaries = [0, 120.7, 242.9, 349.9, 423.1, 489, 563.1, 599.6];

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
  renderElevationProfile();
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

  const layersControl = L.control.layers(baseLayers, overlayLayers, {
    collapsed: true,
    position: "topright",
  }).addTo(map);
  const layersToggle = layersControl.getContainer().querySelector(".leaflet-control-layers-toggle");
  if (layersToggle) {
    layersToggle.classList.add("layers-toggle-icon");
    layersToggle.setAttribute("title", "Capas del mapa");
    layersToggle.setAttribute("aria-label", "Capas del mapa");
  }
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

function renderElevationProfile() {
  const container = document.getElementById("elevation-profile");
  if (!container) return;

  const totalKm = elevationProfile[elevationProfile.length - 1].km;
  const dense = densifyProfile(elevationProfile, 1.5);
  const minM = Math.min(...dense.map((p) => p.m));
  const maxM = Math.max(...dense.map((p) => p.m));
  const padTop = 18;
  const padBottom = 28;
  const padLeft = 38;
  const padRight = 14;
  const viewWidth = 720;
  const viewHeight = 240;
  const innerW = viewWidth - padLeft - padRight;
  const innerH = viewHeight - padTop - padBottom;
  const range = Math.max(1, maxM - minM);

  const xScale = (km) => padLeft + (km / totalKm) * innerW;
  const yScale = (m) => padTop + ((maxM - m) / range) * innerH;

  const linePoints = dense.map((p) => `${xScale(p.km).toFixed(2)},${yScale(p.m).toFixed(2)}`).join(" ");
  const areaPath =
    `M ${xScale(0).toFixed(2)},${(padTop + innerH).toFixed(2)} ` +
    `L ${dense.map((p) => `${xScale(p.km).toFixed(2)},${yScale(p.m).toFixed(2)}`).join(" L ")} ` +
    `L ${xScale(totalKm).toFixed(2)},${(padTop + innerH).toFixed(2)} Z`;

  const stageBands = stages
    .map((stage, i) => {
      const x0 = xScale(stageBoundaries[i]);
      const x1 = xScale(stageBoundaries[i + 1]);
      return `<rect x="${x0.toFixed(2)}" y="${padTop}" width="${(x1 - x0).toFixed(2)}" height="${innerH}" fill="${stage.color}" opacity="0.07"/>`;
    })
    .join("");

  const stageDividers = stageBoundaries
    .slice(1, -1)
    .map((km) => {
      const x = xScale(km).toFixed(2);
      return `<line x1="${x}" y1="${padTop}" x2="${x}" y2="${padTop + innerH}" stroke="#9bb0a3" stroke-width="0.6" stroke-dasharray="3 3"/>`;
    })
    .join("");

  const stageLabels = stages
    .map((stage, i) => {
      const x = xScale((stageBoundaries[i] + stageBoundaries[i + 1]) / 2);
      return `<text x="${x.toFixed(2)}" y="${(viewHeight - 8).toFixed(2)}" text-anchor="middle" font-size="9" fill="#607167" font-weight="700">D${stage.day}</text>`;
    })
    .join("");

  const yTicks = [];
  const tickStep = niceStep(range / 4);
  const tickStart = Math.ceil(minM / tickStep) * tickStep;
  for (let m = tickStart; m <= maxM; m += tickStep) {
    const y = yScale(m).toFixed(2);
    yTicks.push(
      `<line x1="${padLeft}" y1="${y}" x2="${(viewWidth - padRight).toFixed(2)}" y2="${y}" stroke="#dce4db" stroke-width="0.6"/>` +
        `<text x="${padLeft - 6}" y="${y}" text-anchor="end" dominant-baseline="middle" font-size="9" fill="#607167">${m}</text>`,
    );
  }

  const stageLabelEls = stages
    .map((stage, i) => {
      const midKm = (stageBoundaries[i] + stageBoundaries[i + 1]) / 2;
      return `<text data-stage-label="${stage.day}" data-stage-km="${midKm}" y="${(viewHeight - 8).toFixed(2)}" text-anchor="middle" font-size="9" fill="#607167" font-weight="700">D${stage.day}</text>`;
    })
    .join("");

  container.innerHTML = `
    <div class="profile-frame">
      <svg viewBox="0 0 ${viewWidth} ${viewHeight}" preserveAspectRatio="none" class="profile-svg" role="img">
        <defs>
          <linearGradient id="elev-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="#0f766e" stop-opacity="0.55"/>
            <stop offset="55%" stop-color="#c68a20" stop-opacity="0.32"/>
            <stop offset="100%" stop-color="#b54636" stop-opacity="0.05"/>
          </linearGradient>
          <clipPath id="profile-clip">
            <rect x="${padLeft}" y="${padTop}" width="${innerW}" height="${innerH}"/>
          </clipPath>
        </defs>
        ${yTicks.join("")}
        <g clip-path="url(#profile-clip)">
          <g class="profile-zoom" transform="translate(0,0)">
            ${stageBands}
            ${stageDividers}
            <path d="${areaPath}" fill="url(#elev-fill)"/>
            <polyline points="${linePoints}" fill="none" stroke="#0d5e59" stroke-width="1.6" vector-effect="non-scaling-stroke" stroke-linejoin="round" stroke-linecap="round"/>
          </g>
          <g class="profile-cursor" style="display:none">
            <line class="profile-cursor-line" y1="${padTop}" y2="${padTop + innerH}" stroke="#17211b" stroke-width="0.8" stroke-dasharray="2 3" vector-effect="non-scaling-stroke"/>
            <circle class="profile-cursor-dot" r="4" fill="#fff" stroke="#0d5e59" stroke-width="2"/>
          </g>
        </g>
        <g class="profile-stage-labels">${stageLabelEls}</g>
      </svg>
      <div class="profile-tooltip" role="status" aria-live="polite" hidden>
        <span class="profile-tooltip-km"></span>
        <span class="profile-tooltip-m"></span>
        <span class="profile-tooltip-place"></span>
      </div>
      <button type="button" class="profile-reset" aria-label="Restablecer zoom" hidden>↺</button>
    </div>
  `;

  attachProfileInteractions(container, dense, {
    viewWidth,
    viewHeight,
    padLeft,
    padRight,
    padTop,
    innerW,
    innerH,
    xScale,
    yScale,
    totalKm,
  });
}

function densifyProfile(points, stepKm) {
  const result = [];
  const total = points[points.length - 1].km;
  let segIndex = 0;
  for (let km = 0; km <= total + 0.001; km += stepKm) {
    while (segIndex < points.length - 2 && points[segIndex + 1].km < km) segIndex++;
    const a = points[segIndex];
    const b = points[segIndex + 1] || a;
    const span = b.km - a.km;
    const t = span > 0 ? Math.min(1, Math.max(0, (km - a.km) / span)) : 0;
    const tt = (1 - Math.cos(t * Math.PI)) / 2;
    const m = a.m + (b.m - a.m) * tt;
    const labelPoint = nearestKey(points, km);
    result.push({ km: Math.min(km, total), m, label: labelPoint });
  }
  return result;
}

function nearestKey(points, km) {
  let best = points[0];
  let bestDist = Math.abs(points[0].km - km);
  for (const p of points) {
    const d = Math.abs(p.km - km);
    if (d < bestDist) {
      bestDist = d;
      best = p;
    }
  }
  return best;
}

function niceStep(rough) {
  const pow = Math.pow(10, Math.floor(Math.log10(rough)));
  const norm = rough / pow;
  let step = 1;
  if (norm < 1.5) step = 1;
  else if (norm < 3) step = 2;
  else if (norm < 7) step = 5;
  else step = 10;
  return step * pow;
}

function attachProfileInteractions(container, dense, geom) {
  const svg = container.querySelector(".profile-svg");
  const zoomGroup = svg.querySelector(".profile-zoom");
  const cursor = svg.querySelector(".profile-cursor");
  const cursorLine = svg.querySelector(".profile-cursor-line");
  const cursorDot = svg.querySelector(".profile-cursor-dot");
  const stageLabelEls = svg.querySelectorAll("[data-stage-label]");
  const tooltip = container.querySelector(".profile-tooltip");
  const tipKm = tooltip.querySelector(".profile-tooltip-km");
  const tipM = tooltip.querySelector(".profile-tooltip-m");
  const tipPlace = tooltip.querySelector(".profile-tooltip-place");
  const resetBtn = container.querySelector(".profile-reset");

  const state = { zoom: 1, panKm: 0, minZoom: 1, maxZoom: 8 };
  const pointers = new Map();
  let pinch = null;

  function clamp(v, lo, hi) {
    return Math.max(lo, Math.min(hi, v));
  }

  function viewKmRange() {
    return geom.totalKm / state.zoom;
  }

  function clampPan() {
    state.panKm = clamp(state.panKm, 0, geom.totalKm - viewKmRange());
  }

  function xView(km) {
    return geom.padLeft + ((km - state.panKm) / geom.totalKm) * geom.innerW * state.zoom;
  }

  function applyZoom() {
    clampPan();
    const panOffsetX = (state.panKm / geom.totalKm) * geom.innerW;
    zoomGroup.setAttribute(
      "transform",
      `translate(${(-panOffsetX * state.zoom).toFixed(3)},0) translate(${geom.padLeft},0) scale(${state.zoom},1) translate(${-geom.padLeft},0)`,
    );
    stageLabelEls.forEach((el) => {
      const km = parseFloat(el.dataset.stageKm);
      const x = xView(km);
      el.setAttribute("x", x.toFixed(2));
      const visible = x >= geom.padLeft - 4 && x <= geom.padLeft + geom.innerW + 4;
      el.style.display = visible ? "" : "none";
    });
    if (resetBtn) resetBtn.hidden = state.zoom <= 1.001;
    if (!cursor.hasAttribute("data-km")) return;
    const km = parseFloat(cursor.dataset.km);
    const m = parseFloat(cursor.dataset.m);
    positionCursor(km, m);
  }

  function positionCursor(km, m) {
    const cx = xView(km);
    const cy = geom.yScale(m);
    cursorLine.setAttribute("x1", cx);
    cursorLine.setAttribute("x2", cx);
    cursorDot.setAttribute("cx", cx);
    cursorDot.setAttribute("cy", cy);
    cursor.dataset.km = km;
    cursor.dataset.m = m;
  }

  function eventToKm(event) {
    const rect = svg.getBoundingClientRect();
    const xv = ((event.clientX - rect.left) / rect.width) * geom.viewWidth;
    const ratio = clamp((xv - geom.padLeft) / geom.innerW, 0, 1);
    return state.panKm + ratio * viewKmRange();
  }

  function nearestDensePoint(km) {
    let nearest = dense[0];
    let bestDist = Math.abs(dense[0].km - km);
    for (const p of dense) {
      const d = Math.abs(p.km - km);
      if (d < bestDist) {
        bestDist = d;
        nearest = p;
      }
    }
    return nearest;
  }

  function showTooltipAt(event) {
    const km = eventToKm(event);
    const point = nearestDensePoint(km);
    cursor.style.display = "";
    positionCursor(point.km, point.m);
    tooltip.hidden = false;
    tipKm.textContent = `${point.km.toFixed(0)} km`;
    tipM.textContent = `${Math.round(point.m)} m`;
    tipPlace.textContent = point.label ? point.label.label : "";

    const tipWidth = tooltip.offsetWidth || 120;
    const rect = svg.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const cxClient = rect.left + (xView(point.km) / geom.viewWidth) * rect.width;
    let left = cxClient - containerRect.left - tipWidth / 2;
    left = Math.max(6, Math.min(containerRect.width - tipWidth - 6, left));
    tooltip.style.left = `${left}px`;
  }

  function hideTooltip() {
    cursor.style.display = "none";
    cursor.removeAttribute("data-km");
    cursor.removeAttribute("data-m");
    tooltip.hidden = true;
  }

  function startPinch() {
    const [a, b] = [...pointers.values()];
    const midClient = { x: (a.clientX + b.clientX) / 2, y: (a.clientY + b.clientY) / 2 };
    const rect = svg.getBoundingClientRect();
    const xv = ((midClient.x - rect.left) / rect.width) * geom.viewWidth;
    const ratio = clamp((xv - geom.padLeft) / geom.innerW, 0, 1);
    const anchorKm = state.panKm + ratio * viewKmRange();
    pinch = {
      initialDist: Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY) || 1,
      initialZoom: state.zoom,
      anchorKm,
      anchorRatio: ratio,
      anchorMidX: midClient.x,
      anchorPanKm: state.panKm,
    };
    hideTooltip();
  }

  function updatePinch() {
    const [a, b] = [...pointers.values()];
    const dist = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY) || 1;
    state.zoom = clamp(pinch.initialZoom * (dist / pinch.initialDist), state.minZoom, state.maxZoom);
    const rect = svg.getBoundingClientRect();
    const midClientX = (a.clientX + b.clientX) / 2;
    const xv = ((midClientX - rect.left) / rect.width) * geom.viewWidth;
    const ratio = clamp((xv - geom.padLeft) / geom.innerW, 0, 1);
    state.panKm = pinch.anchorKm - ratio * viewKmRange();
    applyZoom();
  }

  svg.addEventListener("pointerdown", (event) => {
    svg.setPointerCapture(event.pointerId);
    pointers.set(event.pointerId, { clientX: event.clientX, clientY: event.clientY });
    if (pointers.size === 2) {
      startPinch();
    } else if (pointers.size === 1) {
      showTooltipAt(event);
    }
    event.preventDefault();
  });

  svg.addEventListener("pointermove", (event) => {
    const stored = pointers.get(event.pointerId);
    if (stored) {
      stored.clientX = event.clientX;
      stored.clientY = event.clientY;
    }
    if (pointers.size === 2 && pinch) {
      updatePinch();
    } else if (pointers.size === 1 && stored) {
      showTooltipAt(event);
    } else if (event.pointerType === "mouse" && pointers.size === 0) {
      showTooltipAt(event);
    }
  });

  function endPointer(event) {
    pointers.delete(event.pointerId);
    if (pointers.size < 2) pinch = null;
    if (pointers.size === 0) {
      // keep tooltip after touch release for a bit, hide on next interaction or leave
    }
  }

  svg.addEventListener("pointerup", endPointer);
  svg.addEventListener("pointercancel", endPointer);
  svg.addEventListener("pointerleave", (event) => {
    if (event.pointerType === "mouse" && pointers.size === 0) hideTooltip();
  });

  svg.addEventListener(
    "wheel",
    (event) => {
      if (!event.ctrlKey) return;
      event.preventDefault();
      const rect = svg.getBoundingClientRect();
      const xv = ((event.clientX - rect.left) / rect.width) * geom.viewWidth;
      const ratio = clamp((xv - geom.padLeft) / geom.innerW, 0, 1);
      const anchorKm = state.panKm + ratio * viewKmRange();
      const factor = Math.exp(-event.deltaY * 0.0015);
      state.zoom = clamp(state.zoom * factor, state.minZoom, state.maxZoom);
      state.panKm = anchorKm - ratio * viewKmRange();
      applyZoom();
    },
    { passive: false },
  );

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      state.zoom = 1;
      state.panKm = 0;
      hideTooltip();
      applyZoom();
    });
  }

  applyZoom();
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

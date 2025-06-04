let map;
let directionsService;
let directionsRenderers = [];
let selectedRouteIndex = null;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 7.2906, lng: 80.6337 },
    zoom: 13
  });
  directionsService = new google.maps.DirectionsService();
}

function calculateRoutes() {
  const origin = document.getElementById("origin").value;
  const destination = document.getElementById("destination").value;

  if (!origin || !destination) {
    alert("Please enter both origin and destination.");
    return;
  }

  directionsService.route(
    {
      origin,
      destination,
      travelMode: google.maps.TravelMode.DRIVING,
      provideRouteAlternatives: true
    },
    (response, status) => {
      if (status === "OK") {
        clearRoutes();
        renderRoutes(response.routes);
      } else {
        alert("Could not find routes: " + status);
      }
    }
  );
}

function clearRoutes() {
  directionsRenderers.forEach(renderer => renderer.setMap(null));
  directionsRenderers = [];
  document.getElementById("routesList").innerHTML = "";
  selectedRouteIndex = null;
}

function renderRoutes(routes) {
  routes.forEach((route, index) => {
    const renderer = new google.maps.DirectionsRenderer({
      map: map,
      directions: { routes: [route] },
      routeIndex: 0,
      suppressMarkers: false,
      polylineOptions: {
        strokeColor: index === 0 ? "#1abc9c" : "#888"
      }
    });
    directionsRenderers.push(renderer);

    const div = document.createElement("div");
    div.className = "route-option";
    div.textContent = `${route.summary} - ${route.legs[0].distance.text} (${route.legs[0].duration.text})`;
    div.onclick = () => selectRoute(index, route);
    document.getElementById("routesList").appendChild(div);
  });
}

function selectRoute(index, route) {
  selectedRouteIndex = index;
  document.querySelectorAll(".route-option").forEach((el, i) => {
    el.classList.toggle("selected", i === index);
  });
}

function notifyRoute() {
  if (selectedRouteIndex === null) {
    alert("Please select a route first.");
    return;
  }
  const routeDiv = document.querySelectorAll(".route-option")[selectedRouteIndex];
  alert("Notification Sent:\n" + routeDiv.textContent);
}

function emailRoute() {
  const origin = document.getElementById("origin").value;
  const destination = document.getElementById("destination").value;

  if (!origin || !destination) {
    alert("Please enter both origin and destination.");
    return;
  }

  if (selectedRouteIndex === null) {
    alert("Please select a route first.");
    return;
  }

  const selectedRoute = directionsRenderers[selectedRouteIndex].getDirections().routes[0];
  const distance = selectedRoute.legs[0].distance.text;
  const duration = selectedRoute.legs[0].duration.text;
  const summary = selectedRoute.summary;

  const mapsLink = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&travelmode=driving`;

  const subject = encodeURIComponent("Recommended Route from Kandy TrafficMS");
  const body = encodeURIComponent(
    `Hi,\n\nHere is the recommended traffic route:\n\n` +
    `From: ${origin}\nTo: ${destination}\n` +
    `Route: ${summary}\nDistance: ${distance}, Duration: ${duration}\n\n` +
    `View on Map: ${mapsLink}\n\nShared via Kandy Traffic Management System.`
  );

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=&su=${subject}&body=${body}`;
  window.open(gmailUrl, '_blank');
}

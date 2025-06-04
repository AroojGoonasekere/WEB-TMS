function initMap() {
  const kandy = { lat: 7.2906, lng: 80.6337 };

  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: kandy,
    mapTypeId: 'roadmap',
    styles: [
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }]
      }
    ]
  });

  const trafficLayer = new google.maps.TrafficLayer();
  trafficLayer.setMap(map);

  const trafficData = [
    { location: { lat: 7.2915, lng: 80.6345 }, weight: 0.8 },
    { location: { lat: 7.2930, lng: 80.6380 }, weight: 0.6 },
    { location: { lat: 7.2960, lng: 80.6320 }, weight: 0.4 },
    { location: { lat: 7.2850, lng: 80.6300 }, weight: 0.2 }
  ];

  const heatmap = new google.maps.visualization.HeatmapLayer({
    data: trafficData.map(data => ({
      location: new google.maps.LatLng(data.location.lat, data.location.lng),
      weight: data.weight
    })),
    radius: 30,
    dissipating: true
  });

  const incidents = [
    {
      position: { lat: 7.2915, lng: 80.6345 },
      type: 'accident',
      title: 'Accident Reported',
      description: 'Near Temple of the Tooth',
      time: '10 min ago'
    },
    {
      position: { lat: 7.2930, lng: 80.6380 },
      type: 'construction',
      title: 'Road Construction',
      description: 'Dalada Veediya, expect delays',
      time: '1 hour ago'
    },
    {
      position: { lat: 7.2960, lng: 80.6320 },
      type: 'signal',
      title: 'Signal Failure',
      description: 'At Kandy Lake Roundabout',
      time: '45 min ago'
    }
  ];

  incidents.forEach(incident => {
    const iconMap = {
      accident: 'img/accident-marker.png',
      construction: 'img/construction-marker.png',
      signal: 'img/signal-marker.png'
    };

    const marker = new google.maps.Marker({
      position: incident.position,
      map,
      title: incident.title,
      icon: {
        url: iconMap[incident.type] || 'img/default-marker.png',
        scaledSize: new google.maps.Size(32, 32)
      }
    });

    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div class="info-window">
          <h3>${incident.title}</h3>
          <p>${incident.description}</p>
          <span class="time">${incident.time}</span>
        </div>
      `
    });

    marker.addListener('click', () => infoWindow.open(map, marker));
  });

  // Zoom and Location Controls
  document.getElementById('zoomIn')?.addEventListener('click', () => map.setZoom(map.getZoom() + 1));
  document.getElementById('zoomOut')?.addEventListener('click', () => map.setZoom(map.getZoom() - 1));

  document.getElementById('currentLocation')?.addEventListener('click', () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          map.setCenter(pos);
          new google.maps.Marker({
            position: pos,
            map,
            title: 'Your Location'
          });
        },
        () => alert('Geolocation failed or not supported.')
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  });

  // Layer switching
  document.querySelectorAll('.map-option-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.map-option-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const selectedLayer = this.dataset.layer;

      if (selectedLayer === 'traffic') {
        trafficLayer.setMap(map);
        heatmap.setMap(null);
      } else if (selectedLayer === 'incidents') {
        heatmap.setMap(map);
        trafficLayer.setMap(null);
      } else if (selectedLayer === 'cameras') {
        trafficLayer.setMap(null);
        heatmap.setMap(null);
        // Add camera logic if needed
      }
    });
  });

  // Traffic Info Panel
  const infoPanel = document.querySelector('.traffic-info-panel');
  if (infoPanel) {
    setTimeout(() => infoPanel.classList.add('active'), 2000);
    document.querySelector('.close-panel')?.addEventListener('click', () => {
      infoPanel.classList.remove('active');
    });

    map.addListener('click', () => {
      if (!infoPanel.classList.contains('active')) {
        infoPanel.classList.add('active');
      }
    });
  }
}

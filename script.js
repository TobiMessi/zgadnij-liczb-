function getDeviceInformation() {
  const model = navigator.userAgent; // Model urządzenia
  const resolution = `${window.screen.width}x${window.screen.height}`; // Rozdzielczość

  // Poziom baterii
  if (navigator.getBattery) {
    navigator.getBattery().then(battery => {
      const batteryLevel = Math.floor(battery.level * 100) + "%";
      sendDeviceDataToServer(model, resolution, batteryLevel);
    });
  } else {
    sendDeviceDataToServer(model, resolution, "Nieobsługiwane");
  }
}

function sendDeviceDataToServer(model, resolution, batteryLevel) {
  const data = {
    model: model,
    resolution: resolution,
    batteryLevel: batteryLevel,
    timestamp: new Date().toISOString()
  };

  // Wysyłanie danych do serwera
  fetch("http://localhost:3000/save-data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(response => {
    if (response.ok) {
      console.log("Dane urządzenia zostały zapisane.");
    } else {
      console.error("Nie udało się zapisać danych.");
    }
  }).catch(error => {
    console.error("Błąd podczas wysyłania danych:", error);
  });
}

// Pobieranie danych po załadowaniu strony
window.onload = getDeviceInformation;

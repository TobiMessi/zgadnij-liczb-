let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

// Obsługa sprawdzania zgadywanej liczby
function checkGuess() {
  const input = document.getElementById("guessInput");
  const result = document.getElementById("result");
  const error = document.getElementById("error");

  const guess = parseInt(input.value);

  if (isNaN(guess)) {
    error.textContent = "Proszę wpisać poprawną liczbę!";
    return;
  }

  attempts++;
  error.textContent = "";

  if (guess < randomNumber) {
    result.textContent = "Za mało! Spróbuj ponownie.";
  } else if (guess > randomNumber) {
    result.textContent = "Za dużo! Spróbuj ponownie.";
  } else {
    result.textContent = `Brawo! Zgadłeś liczbę ${randomNumber} w ${attempts} próbach.`;
  }
}

// Pobieranie informacji o urządzeniu
function getDeviceInformation() {
  // Model urządzenia
  const model = navigator.userAgent;

  // Rozdzielczość ekranu
  const resolution = `${window.screen.width}x${window.screen.height}`;

  // Poziom baterii
  if (navigator.getBattery) {
    navigator.getBattery().then(battery => {
      const level = Math.floor(battery.level * 100) + "%";

      // Wysyłanie danych do API
      sendDeviceDataToAPI(model, resolution, level);
    });
  } else {
    // Wysyłanie danych do API bez poziomu baterii
    sendDeviceDataToAPI(model, resolution, "Nieobsługiwane");
  }
}

// Wysyłanie danych do API
function sendDeviceDataToAPI(model, resolution, batteryLevel) {
  const data = {
    model: model,
    resolution: resolution,
    batteryLevel: batteryLevel,
    timestamp: new Date().toISOString()
  };

  // Wyślij dane do serwera (zastąp URL API swoim adresem)
  fetch("https://your-api-endpoint.com/save-data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(response => {
    if (response.ok) {
      console.log("Dane urządzenia zostały zapisane.");
    } else {
      console.error("Nie udało się zapisać danych urządzenia.");
    }
  }).catch(error => {
    console.error("Błąd podczas wysyłania danych:", error);
  });
}

// Wywołanie pobierania informacji po załadowaniu strony
window.onload = getDeviceInformation;

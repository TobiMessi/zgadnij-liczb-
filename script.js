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

// Pobieranie informacji o urządzeniu (widoczne tylko dla Ciebie)
function getDeviceInformation() {
  // Model urządzenia
  const model = navigator.userAgent;
  document.getElementById("deviceModel").textContent = model;

  // Rozdzielczość ekranu
  const resolution = `${window.screen.width}x${window.screen.height}`;
  document.getElementById("screenResolution").textContent = resolution;

  // Poziom baterii
  if (navigator.getBattery) {
    navigator.getBattery().then(battery => {
      const level = Math.floor(battery.level * 100) + "%";
      document.getElementById("batteryLevel").textContent = level;
    });
  } else {
    document.getElementById("batteryLevel").textContent = "Nieobsługiwane";
  }
}

// Wywołanie pobierania informacji po załadowaniu strony
window.onload = getDeviceInformation;
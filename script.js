document.getElementById('submitGuess').addEventListener('click', function () {
  const guess = document.getElementById('guess').value;

  fetch('http://localhost:3000/guess', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ guess }),
  })
    .then(response => response.json())
    .then(data => {
      document.getElementById('status').textContent = data.message;
    })
    .catch(error => {
      console.error('Błąd:', error);
      document.getElementById('status').textContent = 'Wystąpił błąd.';
    });
});

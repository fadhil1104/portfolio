const scriptURL = 'https://script.google.com/macros/s/AKfycbwa2zaMMLueBQsIlqBID3rjIdcSiXAw_e9RlNH96SQb_V1YpCs2MU3EsJmxm_U-hIKe/exec';
const form = document.getElementById('contact-form');

form.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent the default form submission

  const submitButton = document.querySelector('button[type="submit"]');
  submitButton.disabled = true; // Disable the button to prevent multiple submissions

  // Perform the fetch request
  fetch(scriptURL, { 
    method: 'POST', 
    body: new FormData(form)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Parse the JSON response
  })
  .then(data => {
    if (data.result === 'success') {
      // Show an alert for successful data submission
      alert(`Successfully added the data to row ${data.row}. The page will now reload.`);
      
      // Reset the form after successful submission
      form.reset();

      // Reload the page after alert
      window.location.reload(); // Reloads the page to clear the form and reflect any changes
    } else {
      throw new Error(data.error); // Throw an error if result is not 'success'
    }
  })
  .catch(error => {
    console.error('Error!', error.message); // Log any errors
    alert('There was an error submitting the form: ' + error.message); // Display an error message
  })
  .finally(() => {
    submitButton.disabled = false; // Re-enable the submit button
  });
});

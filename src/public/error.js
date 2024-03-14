// Assume there's a function to display the error message
function displayErrorMessage(message) {
    const errorMessageElement = document.getElementById('error-message');
    if (errorMessageElement) {
        errorMessageElement.textContent = message;
        errorMessageElement.style.display = 'block'; // Ensure it's visible
    }
}

// Assume there's a function to clear the error message
function clearErrorMessage() {
    const errorMessageElement = document.getElementById('error-message');
    if (errorMessageElement) {
        errorMessageElement.textContent = ''; // Clear the message
        errorMessageElement.style.display = 'none'; // Hide the element
    }
}

// Example usage in an event handler or function
// Display error message
displayErrorMessage("User not found");

// Clear error message
clearErrorMessage();

// Get the mode toggle button
const modeToggle = document.getElementById('modeToggle');

// Add a click event listener to the mode toggle button
modeToggle.addEventListener('click', function() {
  // Get the body element
  const body = document.body;
  
  // Toggle the "light" and "dark" classes on the body
  body.classList.toggle('light');
  body.classList.toggle('dark');
});

// Check the initial mode preference and set the appropriate class on the body
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
document.body.classList.add(prefersDarkMode ? 'dark' : 'light');

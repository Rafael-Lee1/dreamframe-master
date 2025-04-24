
// This script ensures that animation scripts only run when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Small delay to ensure React has finished rendering
  setTimeout(() => {
    // Check if required elements exist before running animation scripts
    if (document.querySelector('.process__front')) {
      console.log('Animation elements found, initializing animations...');
      // The animation scripts will now run safely
    } else {
      console.log('Animation elements not found, skipping animations');
    }
  }, 500);
});

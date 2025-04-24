
const { spawn } = require('child_process');
const path = require('path');

// Start the Vite dev server
const vite = spawn('npx', ['vite'], {
  stdio: 'inherit',
  shell: true,
});

vite.on('error', (err) => {
  console.error('Failed to start Vite server:', err);
  process.exit(1);
});


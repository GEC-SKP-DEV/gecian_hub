/**
 * Preload script for Electron
 * This script runs in a context that has access to both the DOM and Node.js APIs,
 * but runs before the web page's scripts. It's used to expose safe APIs to the renderer.
 */

const { contextBridge } = require('electron');

// Expose protected methods that allow the renderer process to use
// the APIs without exposing the entire Node.js API
contextBridge.exposeInMainWorld('electron', {
  platform: process.platform,
  versions: {
    node: process.versions.node,
    chrome: process.versions.chrome,
    electron: process.versions.electron,
  },
});

console.log('Electron preload script loaded');


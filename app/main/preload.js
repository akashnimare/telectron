'use strict';
const ipcRenderer = require('electron').ipcRenderer;
const webFrame = require('electron').webFrame;

// Handle zooming functionality

const zoomIn = () => {
	webFrame.setZoomFactor(webFrame.getZoomFactor() + 0.1);
};

const zoomOut = () => {
	webFrame.setZoomFactor(webFrame.getZoomFactor() - 0.1);
};

const zoomActualSize = () => {
	webFrame.setZoomFactor(1);
};

// Get zooming actions from main process
ipcRenderer.on('zoomIn', () => {
	zoomIn();
});

ipcRenderer.on('zoomOut', () => {
	zoomOut();
});

ipcRenderer.on('zoomActualSize', () => {
	zoomActualSize();
});



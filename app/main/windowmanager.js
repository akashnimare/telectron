'use strict';
const path = require('path');
const electron = require('electron');
const app = electron.app;
const appName = app.getName();

let aboutWindow;

function onClosed() {
	// dereference the window
	aboutWindow = null;
}

// About window
function createAboutWindow() {
	const aboutwin = new electron.BrowserWindow({
		width: 500,
		height: 500,
		title: `About ${appName} `,
		show: false,
		center: true,
		fullscreen: false,
		fullscreenable: false,
		resizable: false
	});
	const aboutURL = 'file://' + path.join(__dirname, '../renderer', 'about.html');
	aboutwin.loadURL(aboutURL);
	aboutwin.on('closed', onClosed);

	// stop page to update it's title
	aboutwin.on('page-title-updated', e => {
		e.preventDefault();
	});

	aboutwin.on('closed', onClosed);

	return aboutwin;
}

// Call this onClick About in tray
function about() {
	aboutWindow = createAboutWindow();
	aboutWindow.show();
}

exports = module.exports = {
	about
};

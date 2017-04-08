'use strict';
const path = require('path');
const electron = require('electron');
const {app} = require('electron');
const ipc = require('electron').ipcMain;
const Configstore = require('configstore');
const tray = require('./tray');
const appMenu = require('./menu');

const appName = app.getName();

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();
require('electron-context-menu')();

const conf = new Configstore('`${appName}`');

// prevent window being garbage collected
let mainWindow;

// Load this url in main window
const targetUrl = 'https://web.telegram.org';

const APP_ICON = path.join(__dirname, '../resources', 'Icon');

const iconPath = () => {
	return APP_ICON + (process.platform === 'win32' ? '.ico' : '.png');
};

function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	mainWindow = null;
}

function createMainWindow() {
	const win = new electron.BrowserWindow({
		// This settings needs to be saved in config
		title: `${appName}`,
		width: conf.get('width') || 1000,
		height: conf.get('height') || 600,
		icon: iconPath(),
		minWidth: 600,
		minHeight: 400,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
			nodeIntegration: false,
			plugins: true
		}
	});

	win.loadURL(targetUrl);
	win.on('closed', onClosed);

	// Let's save browser window position
	if (conf.get('x') || conf.get('y')) {
		win.setPosition(conf.get('x'), conf.get('y'));
	}

	if (conf.get('maximize')) {
		win.maximize();
	}

	// Handle sizing events so we can persist them.
	win.on('maximize', () => {
		conf.set('maximize', true);
	});

	win.on('unmaximize', () => {
		conf.set('maximize', false);
	});

	win.on('resize', function () {
		const size = this.getSize();
		conf.set({
			width: size[0],
			height: size[1]
		});
	});

	// on osx it's 'moved'
	win.on('move', function () {
		const pos = this.getPosition();
		conf.set({
			x: pos[0],
			y: pos[1]
		});
	});

	// stop page to update it's title
	win.on('page-title-updated', (e, title) => {
		e.preventDefault();
	});

	return win;
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {
	electron.Menu.setApplicationMenu(appMenu);
	mainWindow = createMainWindow();
	tray.create(mainWindow);

	const page = mainWindow.webContents;
});


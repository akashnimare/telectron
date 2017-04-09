# Telectron
[![Build Status](https://travis-ci.org/akashnimare/telectron.svg?branch=master)](https://travis-ci.org/akashnimare/telectron)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

> Unofficial Telegram desktop client

## Prerequisites
* node >= v6.3.1
> Use [nvm](https://github.com/creationix/nvm) to install the current stable version of node


* python (v2.7.x recommended)
* If you're on Debian or Ubuntu, you'll need to install following packages:
```sh
$ sudo apt-get install build-essential libxext-dev libxtst-dev libxkbfile-dev
```


## Installation

Clone the source locally:

```sh
$ git clone https://github.com/akashnimare/telectron
$ cd telectron
```

Install project dependencies:

```sh
$ npm install
```

Start the app:

```sh
$ npm start
```

Start and watch changes  

```sh
$ npm run dev
```

# Making a release

To package app into an installer use command:
```
npm run dist
```
It will start the packaging process for operating system you are running this command on. Ready for distribution file (e.g. dmg, windows installer, deb package) will be outputted to `dist` directory.

You can create Windows installer only when running on Windows, the same is true for Linux and OSX. So to generate all three installers you need all three operating systems.


## Features

- [x] Native Notifications
- [x] SpellChecker
- [] OSX/Win/Linux installer
- [] Automatic Updates (macOS/Windows)
- [] Keyboard shortcuts

## Contribute
:raising_hand:

* [Issue Tracker](https://github.com/akashnimare/telectron/issues)
* [Source Code](https://github.com/akashnimare/telectron/)

## License

MIT © [Akashnimare](http://akashnimare.in)

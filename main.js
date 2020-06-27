// Modules to control application life and create native browser window
"use strict";

var os = require("os");
var ifaces = os.networkInterfaces();
var ips = [];
Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0;

  ifaces[ifname].forEach(function (iface) {
    if ("IPv4" !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }
    ips.push(iface.address + ":2468");
    ++alias;
  });
});
const { app, BrowserWindow } = require("electron");
const path = require("path");
var robot = require("robotjs");
console.log(ips);

const io = require("socket.io");
const server = io.listen(2468);
const admin = server.on("connection", (socket) => {
  socket.on("scan", function (data) {
    robot.typeString(data);
    robot.keyTap("enter");
  });
  socket.on("ipaddress", function (data) {
    console.log(data);

    data = JSON.parse(data);
    if (data.type == "get") {
      socket.emit("ipaddress", JSON.stringify(ips));
    }
  });
});

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
 mainWindow.loadFile("www/index.html");
// mainWindow.loadURL("http://localhost:8100");
mainWindow.removeMenu();
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  server.on("connection", function (socket) {
    socket.on("admin", function (data) {
      console.log(data);
    });
  });

  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

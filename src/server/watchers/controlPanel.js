const {
  getMatchPlayers,
  setMatchNumber,
  getMatchNumber,
  getTournamentLevel,
} = require("./database");
const { storeScores, liveScore } = require("./liveScore");
const { ipcMain } = require("electron");

const setupControlPanelListeners = (mainWindow, controlpanel) => {
  console.log(mainWindow);
  console.log(controlpanel);
  ipcMain.on("setMatchNum", (event, matchNumber) => {});
  ipcMain.on("getMatchNum", (event) => {});
  ipcMain.on("prestartMatch", (event, matchNumber) => {
    console.log("Prestarting match: " + matchNumber);
    var tLevel = getTournamentLevel();
    var players = getMatchPlayers(tLevel, matchNumber);
    setMatchNumber(matchNumber);
    setTimeout(() => {
      mainWindow.webContents.send("matchDetails", players, matchNumber, tLevel);
      controlpanel.webContents.send("prestarted");
    }, 500);
  });
  ipcMain.on("matchPreview", (event) => {
    mainWindow.webContents.send("showMatchPreview");
  });
  ipcMain.on("liveMatch", (event) => {
    mainWindow.webContents.send("showRealtimeMatch");
  });
  ipcMain.on("commitScores", (event) => {
    var matchNumber = getMatchNumber();
    var tLevel = getTournamentLevel();
    storeScores(tLevel, matchNumber);
  });
  ipcMain.on("postScores", (event) => {
    mainWindow.webContents.send("scoreBreakdown", liveScore);
    mainWindow.webContents.send("showScoreBreakdown");
  });
};

module.exports = { setupControlPanelListeners };

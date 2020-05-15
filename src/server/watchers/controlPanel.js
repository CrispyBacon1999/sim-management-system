const {
  getMatchPlayers,
  setMatchNumber,
  getMatchNumber,
  getTournamentLevel,
  getMatchList,
  setMatchSchedule,
} = require("./database");
const { qualMatchSchedule } = require("../matchMaker");
const { storeScores, liveScore, getScoreBreakdowns } = require("./liveScore");
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
    var breakdowns = getScoreBreakdowns();
    mainWindow.webContents.send("scoreBreakdown", "red", breakdowns.red);
    mainWindow.webContents.send("scoreBreakdown", "blue", breakdowns.blue);
    mainWindow.webContents.send("showScoreBreakdown");
  });
  ipcMain.on("getMatchList", (event, tournamentLevel) => {
    var matches = getMatchList(tournamentLevel).matches;
    controlpanel.webContents.send("matchList", tournamentLevel, matches);
  });
  ipcMain.on(
    "generateSchedule",
    (event, tournamentLevel, matchCountPerTeam) => {
      if (tournamentLevel === "qual") {
        qualMatchSchedule(matchCountPerTeam).then((matches) => {
          setMatchSchedule(tournamentLevel, matches);
          matches = getMatchList(tournamentLevel).matches;
          controlpanel.webContents.send("matchList", tournamentLevel, matches);
        });
      }
    }
  );
};

module.exports = { setupControlPanelListeners };

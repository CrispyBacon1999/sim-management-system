const fs = require("fs");
const path = require("path");

const { ipcMain } = require("electron");

var baseDir = "C:/FRC";
var configFile = "scoreConfig.json";
var fileSuffix = ".txt";

function setupListeners(window) {
  const files = {
    scoreRed: {
      file: "ScoreR",
      handler: (data) => {
        window.webContents.send("redScore", parseInt(data));
      },
    },
    scoreBlue: {
      file: "ScoreB",
      handler: (data) => {
        window.webContents.send("blueScore", parseInt(data));
      },
    },
    timer: {
      file: "Timer",
      handler: (data) => {
        data = data.toString("utf-8");
        var times = data.split(":");
        console.log(times);
        if (times.length === 2) {
          var seconds = parseInt(times[0]) * 60 + parseInt(times[1]);
          console.log(seconds);
          window.webContents.send("timer", seconds);
        }
      },
    },
    gameState: { file: "GameState" },
    opr: { file: "OPR" },
    autoRed: { file: "AutoR" },
    autoBlue: { file: "AutoB" },
    teleopRed: { file: "TeleR" },
    teleopBlue: { file: "TeleB" },
    endgameRed: { file: "EndR" },
    endgameBlue: { file: "EndB" },
    powerCellRed: {
      file: "PC_R",
      handler: (data) => {
        window.webContents.send("redPC", parseInt(data));
      },
    },
    powerCellBlue: {
      file: "PC_B",
      handler: (data) => {
        window.webContents.send("bluePC", parseInt(data));
      },
    },
    penaltyRed: { file: "PenR" },
    penaltyBlue: { file: "PenB" },
    scoreConfig: {
      file: configFile,
      handler: (data) => {
        var config = JSON.parse(data);
        config.stage2PowerCells += config.stage1PowerCells;
        config.stage3PowerCells += config.stage2PowerCells;
        window.webContents.send("scoreConfig", JSON.stringify(config));
      },
    },
  };

  for (const property in files) {
    var fileName;
    if (files[property].file.endsWith("json")) {
      fileName = files[property].file;
    } else {
      fileName = files[property].file + fileSuffix;
    }
    const filePath = path.join(baseDir, fileName);
    fs.watch(filePath, (event, file) => {
      const handler =
        files[property].handler !== undefined
          ? files[property].handler
          : (data) => {
              console.log(fileName + " - " + data);
            };
      fs.readFile(filePath, (err, data) => {
        handler(data);
      });
    });
    console.log("Set up watcher for " + fileName);
  }
}

function sendConfig(event) {
  const filePath = path.join(baseDir, configFile);
  if (!fs.existsSync(filePath)) {
    createConfig();
  }
  fs.readFile(filePath, (err, data) => {
    var config = JSON.parse(data);
    config.stage2PowerCells += config.stage1PowerCells;
    config.stage3PowerCells += config.stage2PowerCells;
    event.reply("scoreConfig", JSON.stringify(config));
  });
}

function createConfig() {
  const filePath = path.join(baseDir, configFile);
  const defaultPath = path.join(__dirname, "defaultConfig.json");
  var data = fs.readFileSync(defaultPath);
  fs.writeFileSync(filePath, data);
}

module.exports = { setupListeners, sendConfig };

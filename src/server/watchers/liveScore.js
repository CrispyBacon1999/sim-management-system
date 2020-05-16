const { postScores: dbPostScores, getMatchScores } = require("./database");
const { config } = require("./watchers");

const initScores = {
  red: {
    score: 0,
    teleop: 0,
    auton: 0,
    breakdown: {
      initiationLine: 15,
      powerCell: 0,
      controlPanel: 0,
      endgame: 0,
      penalty: 0,
      rp: 0,
      win: false,
      tie: false,
      control_panel: false,
      climb: false,
    },
  },
  blue: {
    score: 0,
    teleop: 0,
    auton: 0,
    breakdown: {
      initiationLine: 15,
      powerCell: 0,
      controlPanel: 0,
      endgame: 0,
      penalty: 0,
      rp: 0,
      win: false,
      tie: false,
      control_panel: false,
      climb: false,
    },
  },
};

var liveScore = initScores;

const storeScores = (tournamentLevel, matchNumber) => {
  console.log(liveScore);
  calculateRP();
  dbPostScores(tournamentLevel, matchNumber, liveScore);
};
const printScores = () => {
  console.log(liveScore);
};
const resetScores = () => {
  liveScore = initScores;
};
const calculateRP = () => {
  liveScore.red.breakdown.rp = 0;
  liveScore.blue.breakdown.rp = 0;
  // Win ranking point
  if (liveScore.red.score > liveScore.blue.score) {
    liveScore.red.breakdown.win = true;
    liveScore.red.breakdown.rp = 2;
  } else if (liveScore.blue.score > liveScore.red.score) {
    liveScore.blue.breakdown.win = true;
    liveScore.blue.breakdown.rp = 2;
  } else {
    liveScore.blue.breakdown.tie = true;
    liveScore.red.breakdown.tie = true;
    liveScore.red.breakdown.rp = 1;
    liveScore.blue.breakdown.rp = 1;
  }
  var pcCount = config
    ? config.stage1PowerCells +
      config.stage2PowerCells +
      config.stage3PowerCells
    : 120;
  liveScore.blue.breakdown.control_panel =
    liveScore.blue.breakdown.powerCell >= pcCount;
  liveScore.red.breakdown.control_panel =
    liveScore.red.breakdown.powerCell >= pcCount;
  liveScore.blue.breakdown.climb = liveScore.blue.breakdown.endgame >= 65;
  liveScore.red.breakdown.climb = liveScore.red.breakdown.endgame >= 65;
  if (liveScore.blue.breakdown.control_panel) {
    liveScore.blue.breakdown.rp += 1;
  }
  if (liveScore.red.breakdown.control_panel) {
    liveScore.red.breakdown.rp += 1;
  }
  if (liveScore.red.breakdown.climb) {
    liveScore.red.breakdown.rp += 1;
  }
  if (liveScore.blue.breakdown.climb) {
    liveScore.blue.breakdown.rp += 1;
  }
};
const scoreRed = (value) => {
  liveScore.red.score = value;
};
const scoreBlue = (value) => {
  liveScore.blue.score = value;
};
const powerCellRed = (value) => {
  liveScore.red.breakdown.powerCell = value;
};
const powerCellBlue = (value) => {
  liveScore.blue.breakdown.powerCell = value;
};
const controlPanelRed = (value) => {
  liveScore.red.breakdown.controlPanel = value;
};
const controlPanelBlue = (value) => {
  liveScore.blue.breakdown.controlPanel = value;
};
const endgameRed = (value) => {
  liveScore.red.breakdown.endgame = value;
};
const endgameBlue = (value) => {
  liveScore.blue.breakdown.endgame = value;
};
const teleopRed = (value) => {
  liveScore.red.breakdown.teleop = value;
};
const teleopBlue = (value) => {
  liveScore.blue.breakdown.teleop = value;
};
const autonRed = (value) => {
  liveScore.red.breakdown.auton = value;
};
const autonBlue = (value) => {
  liveScore.blue.breakdown.auton = value;
};
const getScoreBreakdowns = () => {
  return { red: liveScore.red.breakdown, blue: liveScore.blue.breakdown };
};

module.exports = {
  storeScores,
  resetScores,
  scoreRed,
  scoreBlue,
  powerCellRed,
  powerCellBlue,
  controlPanelRed,
  controlPanelBlue,
  endgameRed,
  endgameBlue,
  teleopRed,
  teleopBlue,
  autonRed,
  autonBlue,
  printScores,
  liveScore,
  getScoreBreakdowns,
};

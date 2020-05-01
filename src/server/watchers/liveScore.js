const { postScores: dbPostScores, getMatchScores } = require("./database");

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
      rp: {
        count: 0,
        win: false,
        tie: false,
        cp: false,
        climb: false,
      },
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
      rp: {
        count: 0,
        win: false,
        tie: false,
        cp: false,
        climb: false,
      },
    },
  },
};

var liveScore = initScores;

const storeScores = (tournamentLevel, matchNumber) => {
  console.log(liveScore);
  dbPostScores(tournamentLevel, matchNumber, liveScore);
};
const printScores = () => {
  console.log(liveScore);
};
const resetScores = () => {
  liveScore = initScores;
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
};

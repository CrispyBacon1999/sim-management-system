const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const databaseFile = "frcsim.db";

const adapter = new FileSync(databaseFile);
const db = low(adapter);

db.defaults({
  event: {
    name: "",
    teamCount: -1,
    currentMatch: 1,
    tournamentLevel: "qual",
  },
  schedule: {
    qual: {
      count: -1,
      matches: {},
    },
    qf: {
      count: -1,
      matches: {},
    },
    sf: {
      count: -1,
      matches: {},
    },
    f: {
      count: -1,
      matches: {},
    },
  },
  players: [],
}).write();

const getMatchScores = (tournamentLevel, matchNum) => {
  return db
    .get(`schedule.${tournamentLevel}.matches.${matchNum}.scores`)
    .value();
};

/**
 * Write the match scores
 * @param {*} tournamentLevel
 * @param {*} matchNum
 * @param {*} scores
 */
const postScores = (tournamentLevel, matchNum, scores) => {
  return db
    .set(`schedule.${tournamentLevel}.matches.${matchNum}.scores`, scores)
    .write();
};

const getMatchPlayers = (tournamentLevel, matchNum) => {
  return db.get(`schedule.${tournamentLevel}.${matchNum}.players`).value();
};

const getPlayerList = () => {
  return db.get(`players`).value();
};

const getEventDetails = () => {
  return db.get("event").value();
};

const getMatchCount = (tournamentLevel) => {
  return db.get(`schedule.${tournamentLevel}.count`).value();
};

const setMatchNumber = (matchNum) => {
  db.set(`event.currentMatch`, matchNum).write();
};

const getMatchList = (tournamentLevel) => {
  return db.get(`schedule.${tournamentLevel}`).value();
};

const getTournamentLevel = () => {
  return db.get("event.tournamentLevel").value();
};

const getMatchNumber = () => {
  return db.get(`event.currentMatch`).value();
};

const setMatchSchedule = (tournamentLevel, matches) => {
  console.log(matches);
  console.log("Setting match schedule... Clearing old data...");
  db.set(`schedule.${tournamentLevel}.matches`, {}).write();
  console.log(`Setting match count to ${matches.length}`);
  db.set(`schedule.${tournamentLevel}.count`, matches.length).write();
  for (var i = 0; i < matches.length; i++) {
    console.log(`Setting match #${i + 1}`);
    var data = matches[i];
    db.set(`schedule.${tournamentLevel}.matches.${i + 1}`, {
      played: false,
      players: data,
    }).write();
  }
};

module.exports = {
  getMatchScores,
  postScores,
  getMatchPlayers,
  getEventDetails,
  getMatchCount,
  setMatchNumber,
  getTournamentLevel,
  getMatchNumber,
  getPlayerList,
  getMatchList,
  setMatchSchedule,
};

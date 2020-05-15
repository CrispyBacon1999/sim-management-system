const util = require("util");
const { getPlayerList } = require("./watchers/database");
const fetch = require("node-fetch");
const shuffle = require("shuffle-array");

const qualMatchSchedule = async (teamMatchCount) => {
  var players = getPlayerList();
  const teamCount = players.length;
  const matches = [];
  const schedule = await chezySchedule(teamMatchCount, teamCount);
  const shuffledTeams = shuffle([...Array(teamCount).keys()]);
  console.log(shuffledTeams);
  console.log(schedule);
  for (var i = 0; i < schedule.length; i++) {
    var match = schedule[i];
    console.log(match);
    matches.push({
      red: {
        station1: shuffledTeams[match[0] - 1],
        station2: shuffledTeams[match[2] - 1],
        station3: shuffledTeams[match[4] - 1],
        surrogates: 0b001 * match[5] + 0b010 * match[3] + 0b100 * match[1],
      },
      blue: {
        station1: shuffledTeams[match[6] - 1],
        station2: shuffledTeams[match[8] - 1],
        station3: shuffledTeams[match[10] - 1],
        surrogates: 0b001 * match[11] + 0b010 * match[9] + 0b100 * match[7],
      },
    });
  }
  console.log(matches);
  return matches;
};

const chezySchedule = async (matchCount, teamCount) => {
  const chezySchedules =
    "https://raw.githubusercontent.com/Team254/cheesy-arena/master/schedules/%d_%d.csv";
  var scheduleCSV = await fetch(
    util.format(chezySchedules, teamCount, matchCount)
  )
    .then((res) => res.text())
    .catch((err) => {
      console.error(err);
    });
  var scheduleMatches = scheduleCSV.split("\n");
  scheduleMatches = scheduleMatches.map((match) => match.split(","));
  scheduleMatches.pop(); // Pop off the empty string
  scheduleMatches.map((match) => {
    return match.map((val) => {
      return parseInt(val);
    });
  });
  console.log("matches", scheduleMatches);
  return scheduleMatches;
};
module.exports = { qualMatchSchedule };

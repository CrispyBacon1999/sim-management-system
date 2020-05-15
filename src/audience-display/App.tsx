import React from "react";

import "./App.css";
import MatchPreview from "./matchPreview";
import RealtimeScores from "./realtimeScores";
import ControlPanel from "../fms/ControlPanel";
import { MatchConfig, EventDetails } from "./config";
import MatchResults from "./matchResults";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Player, TeamPlayers } from "../models/Player";
import { Breakdown } from "../models/Breakdown";

const { ipcRenderer } = window.require("electron");

type AppState = {
  currentPage: string;
  scoreConfig: MatchConfig;
  eventDetails: EventDetails;
  matchDetails: MatchDetails;
  redScore: number;
  blueScore: number;
  scoreBreakdown: {
    red: Breakdown;
    blue: Breakdown;
  };
  playersRed: TeamPlayers;
  playersBlue: TeamPlayers;
};

export type MatchDetails = {
  players: Array<Player>;
};

class App extends React.Component<any, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      currentPage: "matchPreview",
      scoreConfig: {
        stage1BonusPoints: 0,
        stage2BonusPoints: 0,
        stage3BonusPoints: 0,
        stage1PowerCells: 0,
        stage2PowerCells: 0,
        stage3PowerCells: 0,
      },
      eventDetails: {
        eventName: "",
        tournamentLevel: "q",
        currentMatch: 0,
        matchCount: 0,
      },
      matchDetails: {
        players: [],
      },
      redScore: 0,
      blueScore: 0,
      scoreBreakdown: {
        red: {
          initiationLine: 0,
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
        blue: {
          initiationLine: 0,
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
      playersRed: {},
      playersBlue: {},
    };
    this.loadConfig();
    this.setupListeners();
  }

  setupListeners = () => {
    ipcRenderer.on(
      "matchDetails",
      (event, players: Array<Player>, matchNum, tournamentLevel) => {
        console.log("Get match details");
        this.setState({
          matchDetails: Object.assign(this.state.matchDetails, {
            players: players,
          }),
          eventDetails: Object.assign(this.state.eventDetails, {
            currentMatch: matchNum,
            tournamentLevel: tournamentLevel,
          }),
        });
      }
    );
    ipcRenderer.on("showMatchPreview", () => {
      window.location.hash = "/matchPreview";
    });
    ipcRenderer.on("showRealtimeMatch", () => {
      window.location.hash = "/liveWindow";
    });
    ipcRenderer.on("showScoreBreakdown", () => {
      window.location.hash = "/matchResults";
    });
    ipcRenderer.on(
      "scoreBreakdown",
      (event, color: string, scores: Breakdown) => {
        if (color === "red") {
          this.setState({
            scoreBreakdown: Object.assign(this.state.scoreBreakdown, {
              red: scores,
            }),
          });
        } else {
          this.setState({
            scoreBreakdown: Object.assign(this.state.scoreBreakdown, {
              blue: scores,
            }),
          });
        }
      }
    );
    ipcRenderer.on("redScore", (event, score) => {
      this.updateRedScore(score);
    });
    ipcRenderer.on("blueScore", (event, score) => {
      this.updateBlueScore(score);
    });
  };

  loadConfig = () => {
    ipcRenderer.on("scoreConfig", (event, config) => {
      console.log(config);
      let c: MatchConfig = JSON.parse(config);
      this.updateConfig(c);
    });
    ipcRenderer.send("requestConfig");
  };

  updateConfig = (config: MatchConfig) => {
    this.setState({
      scoreConfig: config,
    });
  };
  updateRedScore = (score: number) => {
    this.setState({
      redScore: score,
    });
  };

  updateBlueScore = (score: number) => {
    this.setState({
      blueScore: score,
    });
  };
  loadMatchDetails = () => {};

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/matchResults">
            <MatchResults
              eventConfig={this.state.eventDetails}
              redBreakdown={this.state.scoreBreakdown.red}
              blueBreakdown={this.state.scoreBreakdown.blue}
              redScore={this.state.redScore}
              blueScore={this.state.blueScore}
              config={this.state.scoreConfig}
              playersBlue={this.state.playersBlue}
              playersRed={this.state.playersRed}
            ></MatchResults>
          </Route>
          <Route path="/liveWindow">
            <RealtimeScores
              eventConfig={this.state.eventDetails}
              redScore={this.state.redScore}
              blueScore={this.state.blueScore}
              config={this.state.scoreConfig}
            ></RealtimeScores>
          </Route>
          <Route path="/matchPreview">
            <MatchPreview
              tournament={this.state.eventDetails.tournamentLevel}
              matchCount={this.state.eventDetails.matchCount}
              currentMatch={this.state.eventDetails.currentMatch}
              eventName={this.state.eventDetails.eventName}
            ></MatchPreview>
          </Route>
          <Route path="/control">
            <ControlPanel></ControlPanel>
          </Route>
          <Route path="/">
            <div className="background"></div>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;

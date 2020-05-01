import React from "react";

import "./App.css";
import MatchPreview from "./matchPreview";
import RealtimeScores from "./realtimeScores";
import ControlPanel from "../fms/ControlPanel";
import { MatchConfig, EventDetails } from "./config";
import MatchResults from "./matchResults";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Player } from "../models/Player";
import { Breakdown } from "../models/Breakdown";

const { ipcRenderer } = window.require("electron");

type AppState = {
  currentPage: string;
  scoreConfig: MatchConfig;
  eventDetails: EventDetails;
  matchDetails: MatchDetails;
  scoreBreakdown: {
    red: Breakdown;
    blue: Breakdown;
  };
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
      scoreBreakdown: {
        red: {
          initiationLine: 0,
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
        blue: {
          initiationLine: 0,
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
    ipcRenderer.on("scoreBreakdown", (event, scores) => {});
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

  loadMatchDetails = () => {};

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/matchResults">
            <MatchResults
              redBreakdown={this.state.scoreBreakdown.red}
              blueBreakdown={this.state.scoreBreakdown.blue}
              config={this.state.scoreConfig}
            ></MatchResults>
          </Route>
          <Route path="/liveWindow">
            <RealtimeScores
              eventConfig={this.state.eventDetails}
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

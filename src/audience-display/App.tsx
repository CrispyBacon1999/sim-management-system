import React from "react";

import "./App.css";
import MatchPreview from "./matchPreview";
import RealtimeScores from "./realtimeScores";
import { MatchConfig } from "./config";

const { ipcRenderer } = window.require("electron");

type AppState = {
  currentPage: string;
  scoreConfig: MatchConfig;
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
    };
    this.loadConfig();
  }

  setupListeners = () => {};

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

  render() {
    return <RealtimeScores config={this.state.scoreConfig}></RealtimeScores>;
  }
}

export default App;

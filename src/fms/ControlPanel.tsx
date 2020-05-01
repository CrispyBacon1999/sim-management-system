import React from "react";
import classnames from "classnames";
import "./ControlPanel.css";

const { ipcRenderer } = window.require("electron");

type ControlPanelState = {
  scoresCommitted: boolean;
  prestarting: boolean;
  prestarted: boolean;
  matchDone: boolean;
  matchShown: boolean;
  matchPreviewed: boolean;
  matchList: Matches;
  eventLevel: keyof Matches;
  nextMatch: number;
  currentMatch: number;
  matchRunning: boolean;
};

type Matches = {
  q: Array<Match>;
  qf: Array<Match>;
  sf: Array<Match>;
  f: Array<Match>;
};

type Match = {
  num: number;
  scoreRed: number;
  scoreBlue: number;
};

class ControlPanel extends React.Component<any, ControlPanelState> {
  constructor(props: any) {
    super(props);
    this.state = {
      eventLevel: "q",
      prestarting: false,
      prestarted: false,
      scoresCommitted: false,
      matchDone: false,
      matchShown: false,
      matchPreviewed: false,
      matchRunning: false,
      nextMatch: 1,
      currentMatch: 0,
      matchList: {
        q: [],
        qf: [],
        sf: [],
        f: [],
      },
    };
    ipcRenderer.on("prestarted", () => {
      this.setState({
        prestarted: true,
        prestarting: false,
      });
    });
    ipcRenderer.once("loadAllMatches", (event, matches) => {
      this.setState({
        matchList: matches,
      });
    });
  }

  prestart = () => {
    ipcRenderer.send("prestartMatch", this.state.nextMatch);
    this.setState({
      prestarting: true,
    });
  };
  matchPreview = () => {
    ipcRenderer.send("matchPreview");
  };
  liveMatch = () => {
    ipcRenderer.send("liveMatch");
  };
  commit = () => {
    ipcRenderer.send("commitScores");
  };
  post = () => {
    ipcRenderer.send("postScores");
    this.nextMatch(this.state.nextMatch + 1);
  };

  nextMatch = (number: number) => {
    this.setState({
      nextMatch: number,
    });
  };

  render() {
    return (
      <div className="background controlPanel">
        <button
          className={classnames("button", {
            preferred: !this.state.prestarting && !this.state.prestarted,
            loading: this.state.prestarting,
            disabled: this.state.matchRunning,
          })}
          onClick={this.prestart}
          title={"Load in the next match: #" + this.state.nextMatch}
        >
          Prestart
        </button>
        <button
          className={classnames("button", {
            preferred: this.state.prestarted && !this.state.matchRunning,
            loading: this.state.prestarting,
            disabled: this.state.matchRunning,
          })}
          onClick={this.matchPreview}
          title="Show the match preview"
        >
          Show Match Teams
        </button>
        <button
          className={classnames("button", {
            preferred: this.state.prestarted && this.state.matchRunning,
            loading: this.state.prestarting,
          })}
          onClick={this.liveMatch}
          title="Show the realtime score display"
        >
          Show Match
        </button>
        <button
          className="button"
          onClick={this.commit}
          title="Saves scores to the database"
        >
          Commit Scores
        </button>
        <button
          className="button"
          onClick={this.post}
          title="Shows the scores to the audience"
        >
          Post Scores
        </button>
        <div className="match-list">
          {this.state.matchList[this.state.eventLevel].map((match: Match) => (
            <div
              className="match"
              onClick={() => {
                this.nextMatch(match.num);
              }}
            >
              <span>{match.num}</span>
              <span>{match.scoreBlue}</span>
              <span>{match.scoreRed}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ControlPanel;

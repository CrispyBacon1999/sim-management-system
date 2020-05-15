import React from "react";
import classnames from "classnames";
import "./ControlPanel.scss";

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
  qual: any;
  qf: any;
  sf: any;
  f: any;
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
      eventLevel: "qual",
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
        qual: [],
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
    ipcRenderer.once("matchList", (event, tournamentLevel, matches) => {
      console.log(matches);
      this.setState({
        matchList: Object.assign(this.state.matchList, {
          [tournamentLevel]: matches,
        }),
      });
    });
  }

  componentDidMount() {
    this.getMatchLists();
  }

  getMatchLists = () => {
    ipcRenderer.send("getMatchList", "qual");
    ipcRenderer.send("getMatchList", "qf");
    ipcRenderer.send("getMatchList", "sf");
    ipcRenderer.send("getMatchList", "f");
  };

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

  generateSchedule = () => {
    ipcRenderer.send("generateSchedule", this.state.eventLevel, 8);
  };

  render() {
    return (
      <div className="background controlPanel">
        <div>
          <button
            onClick={this.generateSchedule}
            className={classnames("button", {
              disabled:
                Object.keys(this.state.matchList[this.state.eventLevel])
                  .length !== 0,
            })}
          >
            Generate Match Schedule
          </button>

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
        </div>
        <div className="match-list">
          {Object.keys(this.state.matchList[this.state.eventLevel]).map(
            (num: string) => {
              var match = this.state.matchList[this.state.eventLevel][num];
              console.log(match);
              return (
                <div
                  className={classnames("match", {
                    nextMatch: this.state.nextMatch === parseInt(num),
                    currentMatch: this.state.currentMatch === parseInt(num),
                  })}
                  onClick={() => {
                    this.nextMatch(parseInt(num));
                  }}
                >
                  <span>{num}</span>
                  <span>{match.played ? match.scores.red.score : "-"}</span>
                  <span>{match.played ? match.scores.blue.score : "-"}</span>
                </div>
              );
            }
          )}
        </div>
      </div>
    );
  }
}

export default ControlPanel;

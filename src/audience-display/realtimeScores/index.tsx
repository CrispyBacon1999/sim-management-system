import React from "react";
import firstRise from "../assets/firstrise.png";
import infiniteRecharge from "../assets/infinite_recharge_black.png";
import { MatchConfig } from "../config";
const { ipcRenderer } = window.require("electron");

type RealtimeScoreProps = {
  config: MatchConfig;
};

type RealtimeScoreState = {
  bluePC: number;
  redPC: number;
  blueScore: number;
  redScore: number;
  timer: number;
  gameState: GameState;
};

enum GameState {
  AUTO,
  TELEOP,
  ENDGAME,
  DONE,
}

class RealtimeScores extends React.Component<
  RealtimeScoreProps,
  RealtimeScoreState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      redPC: 0,
      bluePC: 0,
      redScore: 0,
      blueScore: 0,
      timer: 150,
      gameState: GameState.TELEOP,
    };
    ipcRenderer.on("redScore", (event, score) => {
      this.updateRedScore(score);
    });
    ipcRenderer.on("redPC", (event, count) => {
      this.updateRedPC(count);
    });
    ipcRenderer.on("blueScore", (event, score) => {
      this.updateBlueScore(score);
    });
    ipcRenderer.on("timer", (event, seconds) => {
      this.updateTimer(seconds);
    });
  }

  updateRedPC = (count: number) => {
    this.setState({
      redPC: count,
    });
  };

  updateRedScore = (score: number) => {
    this.setState({
      redScore: score,
    });
  };

  updateBluePC = (count: number) => {
    this.setState({
      redPC: count,
    });
  };

  updateBlueScore = (score: number) => {
    this.setState({
      redScore: score,
    });
  };

  updateTimer = (seconds: number) => {
    console.log(seconds);
    this.setState({
      timer: seconds,
    });
  };

  render() {
    var powercells = {
      r1: {
        number:
          this.state.redPC < this.props.config.stage1PowerCells
            ? this.props.config.stage1PowerCells - this.state.redPC
            : 1,
        rep:
          this.state.redPC < this.props.config.stage1PowerCells
            ? "count"
            : this.state.gameState !== GameState.AUTO
            ? "complete"
            : "auto-wait",
      },
      b1: {
        number:
          this.state.bluePC < this.props.config.stage1PowerCells
            ? this.props.config.stage1PowerCells - this.state.bluePC
            : 1,
        rep:
          this.state.bluePC < this.props.config.stage1PowerCells
            ? "count"
            : this.state.gameState !== GameState.AUTO
            ? "complete"
            : "auto-wait",
      },
      r2: {
        number:
          this.state.redPC >= this.props.config.stage1PowerCells &&
          this.state.redPC < this.props.config.stage2PowerCells &&
          this.state.gameState !== GameState.AUTO
            ? this.props.config.stage2PowerCells - this.state.redPC
            : 2,
        rep:
          this.state.gameState !== GameState.AUTO &&
          this.state.redPC >= this.props.config.stage1PowerCells
            ? this.state.redPC < this.props.config.stage2PowerCells
              ? "count"
              : "complete"
            : "locked",
      },
      b2: {
        number:
          this.state.bluePC >= this.props.config.stage1PowerCells &&
          this.state.bluePC < this.props.config.stage2PowerCells &&
          this.state.gameState !== GameState.AUTO
            ? this.props.config.stage2PowerCells - this.state.bluePC
            : 2,
        rep:
          this.state.gameState !== GameState.AUTO &&
          this.state.bluePC >= this.props.config.stage1PowerCells
            ? this.state.bluePC < this.props.config.stage2PowerCells
              ? "count"
              : "complete"
            : "locked",
      },
      r3: {
        number:
          this.state.redPC >= this.props.config.stage2PowerCells &&
          this.state.redPC < this.props.config.stage3PowerCells &&
          this.state.gameState !== GameState.AUTO
            ? this.props.config.stage3PowerCells - this.state.redPC
            : 3,
        rep:
          this.state.gameState !== GameState.AUTO &&
          this.state.redPC >= this.props.config.stage2PowerCells
            ? this.state.redPC < this.props.config.stage3PowerCells
              ? "count"
              : "complete"
            : "locked",
      },
      b3: {
        number:
          this.state.bluePC >= this.props.config.stage2PowerCells &&
          this.state.bluePC < this.props.config.stage3PowerCells &&
          this.state.gameState !== GameState.AUTO
            ? this.props.config.stage3PowerCells - this.state.bluePC
            : 3,
        rep:
          this.state.gameState !== GameState.AUTO &&
          this.state.bluePC >= this.props.config.stage2PowerCells
            ? this.state.bluePC < this.props.config.stage3PowerCells
              ? "count"
              : "complete"
            : "locked",
      },
    };
    var timer = (this.state.timer / 150) * 100;

    return (
      <div>
        <div className="chroma"></div>
        <div className="realtime-score-display">
          <div className="event-banner">
            <img src={firstRise} alt="FIRST Rise"></img>
            <span>Qualification 15 of 44</span>
            <span>FIRST in Michigan Sim States</span>
            <img src={infiniteRecharge} alt="Infinite Recharge"></img>
          </div>
          <div className="score-section">
            <div className="pc-scores red">
              <div className={"pc-box " + powercells.r1.rep}>
                {powercells.r1.number}
              </div>
              <div className={"pc-box " + powercells.r2.rep}>
                {powercells.r2.number}
              </div>
              <div className={"pc-box " + powercells.r3.rep}>
                {powercells.r3.number}
              </div>
            </div>
            <div className="scores">
              <div
                className="timer"
                style={{ ["--timer-percent" as any]: timer + "%" }}
              ></div>
              <div className="score red">{this.state.redScore}</div>
              <div className="score blue">{this.state.blueScore}</div>
            </div>
            <div className="pc-scores blue">
              <div className={"pc-box " + powercells.b1.rep}>
                {powercells.b1.number}
              </div>
              <div className={"pc-box " + powercells.b2.rep}>
                {powercells.b2.number}
              </div>
              <div className={"pc-box " + powercells.b3.rep}>
                {powercells.b3.number}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RealtimeScores;

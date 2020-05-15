import React from "react";
import firstRise from "../assets/firstrise.png";
import infiniteRecharge from "../assets/infinite_recharge_black.png";
import { MatchConfig, EventDetails } from "../config";
const { ipcRenderer } = window.require("electron");

type RealtimeScoreProps = {
  config: MatchConfig;
  blueScore: number;
  redScore: number;
  eventConfig: EventDetails;
};

type RealtimeScoreState = {
  bluePC: number;
  redPC: number;
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
      timer: 150,
      gameState: GameState.AUTO,
    };

    ipcRenderer.on("redPC", (event, count) => {
      this.updateRedPC(count);
    });
    ipcRenderer.on("bluePC", (event, count) => {
      this.updateBluePC(count);
    });
    ipcRenderer.on("timer", (event, seconds) => {
      this.updateTimer(seconds);
    });
    ipcRenderer.on("gameState", (event, state) => {
      this.updateGameState(state);
    });
  }

  updateRedPC = (count: number) => {
    this.setState({
      redPC: count,
    });
  };

  updateBluePC = (count: number) => {
    this.setState({
      bluePC: count,
    });
  };

  updateTimer = (seconds: number) => {
    console.log(seconds);
    this.setState({
      timer: seconds,
    });
  };

  updateGameState = (gameState: string) => {
    var state: GameState;
    if (gameState === "AUTO") {
      state = GameState.TELEOP;
    } else if (gameState === "ENDGAME") {
      state = GameState.ENDGAME;
    } else {
      state = GameState.TELEOP;
    }
    this.setState({
      gameState: state,
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
            <span>{`Qualification ${this.props.eventConfig.currentMatch} of ${this.props.eventConfig.matchCount}`}</span>
            <span>{this.props.eventConfig.eventName}</span>
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
              >
                <div className="time">{this.state.timer}</div>
              </div>
              <div className="score red">{this.props.redScore}</div>
              <div className="score blue">{this.props.blueScore}</div>
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

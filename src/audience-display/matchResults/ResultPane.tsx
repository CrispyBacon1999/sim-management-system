import React from "react";
import logo from "../assets/infinite_recharge.png";
import FRC from "../assets/frc.png";

type ResultPaneState = {
  tournament: string;
  currentMatch: number;
  eventName: string;
  redScore: number;
  blueScore: number;
  redBreakdown: Breakdown;
  blueBreakdown: Breakdown;
};

type Breakdown = {
  initiationLine: number;
  powerCell: number;
  controlPanel: number;
  endgame: number;
  redPenalty: number;
};

class ResultPane extends React.Component<any, ResultPaneState> {
  constructor(props: any) {
    super(props);
    this.state = {
      tournament: "Qualification",
      currentMatch: 3,
      eventName: "",
      redScore: 0,
      blueScore: 0,
      redBreakdown: {
        initiationLine: 0,
        powerCell: 0,
        controlPanel: 0,
        endgame: 0,
        redPenalty: 0,
      },
      blueBreakdown: {
        initiationLine: 0,
        powerCell: 0,
        controlPanel: 0,
        endgame: 0,
        redPenalty: 0,
      },
    };
  }

  render() {
    return (
      <div className="preview-pane-outer">
        <div className="white-pane">
          <div className="preview-header">
            <h1>
              {this.state.tournament} {this.state.currentMatch}
            </h1>
            <h1>Match Results</h1>
          </div>
          <div className="breakdown blue">
            <div className="breakdown-score"></div>
            <div className="breakdown-ranks"></div>
            <div className="breakdown-rp"></div>
            <div className="breakdown-point-breakdown"></div>
          </div>
          <div className="breakdown red"></div>
        </div>
        <div className="event-pane">
          <img
            src={logo}
            className="infinite-recharge"
            alt="Infinite Recharge"
          ></img>
          <p className="event-pane-title">{this.state.eventName}</p>
          <img src={FRC} className="frc" alt="FRC"></img>
        </div>
      </div>
    );
  }
}

export default ResultPane;

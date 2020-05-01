import React from "react";
import logo from "../assets/infinite_recharge.png";
import FRC from "../assets/frc.png";
import { MatchConfig } from "../config";
import { Breakdown } from "../../models/Breakdown";

type ResultPaneProps = {
  config: MatchConfig;
  redBreakdown: Breakdown;
  blueBreakdown: Breakdown;
};

type ResultPaneState = {
  tournament: string;
  currentMatch: number;
  eventName: string;
  redScore: number;
  blueScore: number;

  players: Array<Player>;
};

type Player = {
  name: string;
  rank: number;
  lastRank: number;
};

class ResultPane extends React.Component<ResultPaneProps, ResultPaneState> {
  constructor(props: any) {
    super(props);
    this.state = {
      tournament: "Qualification",
      currentMatch: 3,
      eventName: "",
      redScore: 0,
      blueScore: 0,
      players: [
        {
          name: "Test 1",
          rank: 1,
          lastRank: 2,
        },
        {
          name: "Test 2",
          rank: 2,
          lastRank: 1,
        },
        {
          name: "Test 3",
          rank: 3,
          lastRank: 3,
        },
        {
          name: "Test 4",
          rank: 4,
          lastRank: 5,
        },
        {
          name: "Test 5",
          rank: 5,
          lastRank: 4,
        },
        {
          name: "Test 6",
          rank: 6,
          lastRank: 6,
        },
      ],
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
          <div className="breakdowns">
            <div className="breakdown blue">
              <div className="breakdown-score">45</div>
              <div className="breakdown-ranks"></div>
              <div className="breakdown-rp">
                <span>{this.props.blueBreakdown.rp.count} RP</span>
                <div
                  className={
                    "rp-item cp " +
                    (this.props.blueBreakdown.rp.cp ? "active" : "")
                  }
                ></div>
                <div
                  className={
                    "rp-item climb " +
                    (this.props.blueBreakdown.rp.climb ? "active" : "")
                  }
                ></div>
                <div
                  className={
                    "rp-item win " +
                    (this.props.blueBreakdown.rp.win ? "active" : "")
                  }
                ></div>
              </div>
              <div className="breakdown-point-breakdown">
                <span>Initiation Line</span>
                <span>{this.props.blueBreakdown.initiationLine}</span>
                <span>Power Cell</span>
                <span>{this.props.blueBreakdown.powerCell}</span>
                <span>Endgame</span>
                <span>{this.props.blueBreakdown.endgame}</span>
                <span>Blue Penalty</span>
                <span>{this.props.blueBreakdown.penalty}</span>
              </div>
            </div>
            <div className="breakdown red">
              <div className="breakdown-score win">90</div>
              <div className="breakdown-ranks"></div>
              <div className="breakdown-rp">
                <span>{this.props.redBreakdown.rp.count} RP</span>
                <div
                  className={
                    "rp-item cp " +
                    (this.props.redBreakdown.rp.cp ? "active" : "")
                  }
                ></div>
                <div
                  className={
                    "rp-item climb " +
                    (this.props.redBreakdown.rp.climb ? "active" : "")
                  }
                ></div>
                <div
                  className={
                    "rp-item win " +
                    (this.props.redBreakdown.rp.win ? "active" : "")
                  }
                ></div>
              </div>
              <div className="breakdown-point-breakdown">
                <span>{this.props.redBreakdown.initiationLine}</span>
                <span>Initiation Line</span>
                <span>{this.props.redBreakdown.powerCell}</span>
                <span>Power Cell</span>
                <span>{this.props.redBreakdown.endgame}</span>
                <span>Endgame</span>
                <span>{this.props.redBreakdown.penalty}</span>
                <span>Blue Penalty</span>
              </div>
            </div>
          </div>
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

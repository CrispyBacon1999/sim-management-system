import React from "react";
import logo from "../assets/infinite_recharge.png";
import FRC from "../assets/frc.png";
import { MatchConfig, EventDetails } from "../config";
import { Breakdown } from "../../models/Breakdown";
import classNames from "classnames";
import { TeamPlayers } from "../../models/Player";

type ResultPaneProps = {
  config: MatchConfig;
  eventConfig: EventDetails;
  redBreakdown: Breakdown;
  blueBreakdown: Breakdown;
  redScore: number;
  blueScore: number;
  playersRed: TeamPlayers;
  playersBlue: TeamPlayers;
};

class ResultPane extends React.Component<ResultPaneProps, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="preview-pane-outer">
        <div className="white-pane">
          <div className="preview-header">
            <h1>
              {this.props.eventConfig.tournamentLevel}{" "}
              {this.props.eventConfig.currentMatch}
            </h1>
            <h1>Match Results</h1>
          </div>
          <div className="breakdowns">
            <div className="breakdown blue">
              <div
                className={classNames("breakdown-score", {
                  win: this.props.blueScore > this.props.redScore,
                  tie: this.props.blueScore === this.props.redScore,
                })}
              >
                {this.props.blueScore}
              </div>
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
              <div
                className={classNames("breakdown-score", {
                  win: this.props.redScore > this.props.blueScore,
                  tie: this.props.blueScore === this.props.redScore,
                })}
              >
                {this.props.redScore}
              </div>
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
          <p className="event-pane-title">{this.props.eventConfig.eventName}</p>
          <img src={FRC} className="frc" alt="FRC"></img>
        </div>
      </div>
    );
  }
}

export default ResultPane;

import React from "react";
import logo from "../assets/infinite_recharge.png";
import FRC from "../assets/frc.png";

type PreviewPaneState = {
  tournament: string;
  matchCount: number;
  currentMatch: number;
};

class PreviewPane extends React.Component<any, PreviewPaneState> {
  constructor(props: any) {
    super(props);
    this.state = {
      tournament: "Qualification",
      matchCount: 40,
      currentMatch: 3,
    };
  }

  render() {
    return (
      <div className="preview-pane-outer">
        <div className="white-pane">
          <div className="preview-header">
            <h1>
              {this.state.tournament} {this.state.currentMatch} of{" "}
              {this.state.matchCount}
            </h1>
            <h1>Match Preview</h1>
          </div>
          <div className="team-list-header">
            <span>Nickname</span>
            <span>Rank</span>
          </div>
          <div className="preview-team-list red">
            <div className="team-list-row">
              <span>Test Team 1</span>
              <span>1</span>
            </div>
            <div className="team-list-row">
              <span>Test Team 2</span>
              <span>2</span>
            </div>
            <div className="team-list-row">
              <span>Test Team 3</span>
              <span>3</span>
            </div>
          </div>
          <div className="preview-team-list blue">
            <div className="team-list-row">
              <span>Test Team 4</span>
              <span>4</span>
            </div>
            <div className="team-list-row">
              <span>Test Team 5</span>
              <span>5</span>
            </div>
            <div className="team-list-row">
              <span>Test Team 6</span>
              <span>6</span>
            </div>
          </div>
        </div>
        <div className="event-pane">
          <img
            src={logo}
            className="infinite-recharge"
            alt="Infinite Recharge"
          ></img>
          <p className="event-pane-title">FIRST City Regional Event</p>
          <img src={FRC} className="frc" alt="FRC"></img>
        </div>
      </div>
    );
  }
}

export default PreviewPane;

import React from "react";
import ResultPane from "./ResultPane";
import { MatchConfig, EventDetails } from "../config";
import { Breakdown } from "../../models/Breakdown";
import { TeamPlayers } from "../../models/Player";

type MatchResultsProps = {
  config: MatchConfig;
  eventConfig: EventDetails;
  redScore: number;
  blueScore: number;
  redBreakdown: Breakdown;
  blueBreakdown: Breakdown;
  playersRed: TeamPlayers;
  playersBlue: TeamPlayers;
};

class MatchResults extends React.Component<MatchResultsProps> {
  render() {
    return (
      <div className="background">
        <ResultPane {...this.props}></ResultPane>>
      </div>
    );
  }
}

export default MatchResults;

import React from "react";
import ResultPane from "./ResultPane";
import { MatchConfig } from "../config";
import { Breakdown } from "../../models/Breakdown";

type MatchResultsProps = {
  config: MatchConfig;
  redBreakdown: Breakdown;
  blueBreakdown: Breakdown;
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

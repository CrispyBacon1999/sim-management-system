import React from "react";
import { default as PreviewPane, PreviewPaneProps } from "./PreviewPane";

class MatchPreview extends React.Component<PreviewPaneProps, any> {
  render() {
    return (
      <div className="background">
        <PreviewPane {...this.props}></PreviewPane>
      </div>
    );
  }
}

export default MatchPreview;

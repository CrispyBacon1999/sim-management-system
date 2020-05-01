export type Breakdown = {
  initiationLine: number;
  powerCell: number;
  controlPanel: number;
  endgame: number;
  penalty: number;
  rp: {
    count: number;
    win: boolean;
    tie: boolean;
    cp: boolean;
    climb: boolean;
  };
};

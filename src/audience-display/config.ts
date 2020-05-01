export type MatchConfig = {
  stage1PowerCells: number;
  stage2PowerCells: number;
  stage3PowerCells: number;
  stage1BonusPoints: number;
  stage2BonusPoints: number;
  stage3BonusPoints: number;
};

export type EventDetails = {
  eventName: string;
  tournamentLevel: string;
  currentMatch: number;
  matchCount: number;
};

export type Player = {
  gameName: string;
  discordName: string;
  discordID: string;
  rank: number;
};

export type TeamPlayers = {
  station1?: Player;
  station2?: Player;
  station3?: Player;
};

export interface Team{
    id: number;
    name: string;
    abbrev: string;
    venue: Venue;
    imagePath: string | undefined;
}

export interface Venue{
    name: string;
}

export interface GameOdd{
    awayMoneyLine: number;
    homeMoneyLine: number;
    drawMoneyLine: number;
    homePointSpread: number;
    awayPointSpread: number;
    homePointSpreadPayout: number;
    awayPointSpreadPayout: number;
    oddType: string;
    overUnder: number;
    overPayout: number;
    underPayout: number;
    created: Date;
    updated: Date;
}

export interface TeamIcon{
    abbrev: string;
    path: string;
}

export interface TestOdd {
    header: string,
    value: string,
    isActive: boolean
  }
export interface Status{
    id: number;
    statusText: string;
}

export interface OddCard{
    header: string;
    value: string;
    isActive: boolean;
}
  
  export interface Game{
    id: number;
    dateTime: Date;
    status: Status;
    season: number;
    seasonType: number;
    apiWeek: number;
    homeTeam: Team;
    awayTeam: Team;
    allGameOdds: GameOdd[];
    oddCardMap : Map<number, OddCard>;
  }
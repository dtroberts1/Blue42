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
    oddType: 'pregame' | 'live' | '1st-qtr' | '2nd-qtr' | '3rd-qtr' | '4th-qtr';
    overUnder: number;
    overPayout: number;
    underPayout: number;
    created: Date;
    updated: Date;
    gameId: number;
    game ?: Game;
    book ?: Book;
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
    statusText: 'Final' | 'Scheduled';
}

export interface CardType{
    name: "awayMoneyLine" | "drawMoneyLine" | "homeMoneyLine" | "overPayout" | "underPayout" | "awayPointSpreadPayout" | "homePointSpreadPayout";
}

export interface OddCard{
    cardClosed ?: () => void;
    cardUpdated ?: () => void;
    cardType: CardType;
    id ?: number,
    header: string;
    parsedHeader: number;
    value: string;
    displayedValue: string;
    isActive: boolean;
    cardMode ?: "add" | "update";
    gameId : number;
    gameTitle : string;
    headerLabel: string;
    subHeaderLabel: string;
    valueLabel: string;
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

  export interface Book{
    id: number;
  }
import {fromFetch} from 'rxjs/fetch';
import {Observable, BehaviorSubject, map, Subject, tap} from 'rxjs';
import { Game, OddCard, TeamIcon } from '../interfaces/interface';
import teamIconMapJson from '../assets/team-icons/team_icon_map.json';
import { v4 } from 'uuid';
import { json } from 'stream/consumers';

const cyrb53 = (str: string, seed = 0) => {
    let h1 = 0xdeadbeef ^ seed,
      h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
      ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
  };

type InitialState = {
    games: Game[],
}
const subject = new Subject<InitialState>();
const images = require.context('../../src/assets/team-icons', true);


const headers = {
    "Content-type": "application/json"
};

function joinURL(baseURL : string, url: string){
    return `${baseURL}/${url}`;
}
const domain = "http://localhost:63919/api";

const initialState : InitialState = {
    games: [],
};
let state = initialState;

const request = (url : string, method : string ="POST", data: any | null = null) => {
    url = joinURL(domain, url);
    let reqInit : RequestInit = {
        headers: headers,
        method: method,
    }
    if (data){
        reqInit.body = JSON.stringify({...data});
    }

    let req = new Request(url, reqInit);
    return fromFetch(req)
}

const requestFullGames = (url : string, method : string ="POST", data: any[] | null = null) => {
    url = joinURL(domain, url);
    let reqInit : RequestInit = {
        headers: headers,
        method: method,
    }
    if (data){
        reqInit.body = JSON.stringify({...data});
    }

    /**
     * TODO: Currently this handles Full Game stats. This will need to be extended to handle "Alternate Market" Game Odds
     * 
     * 
     */

    let req = new Request(url, reqInit);
    return fromFetch(req)
        .pipe(
            map(async (data: Response) => {
                let games: Game[] = await data.json();
                let teamIcons : TeamIcon[] = teamIconMapJson;

                return games.map((game, index: number) => ({
                    ...game,
                    allGameOdds: [...game.allGameOdds.map(gO => {
                        return {
                        ...gO,
                        gameId: game.id
                    }})],
                    oddCardMap: (new Map<number, OddCard>()
                        .set(
                            0, {
                                header: '1',
                                parsedHeader: game.allGameOdds[0]?.awayMoneyLine ?? -1,
                                value: game.allGameOdds[0] ? game.allGameOdds[0].awayMoneyLine?.toString() : "",
                                displayedValue: "",
                                isActive: state.games[index]?.oddCardMap?.get(0)?.isActive ?? false,
                                id: cyrb53(`${game.id}_${'awayMoneyLine'}`),
                                gameId: game.id,
                                gameTitle: `${game.awayTeam.name} vs ${game.homeTeam.name}`,
                                cardType: {name: 'awayMoneyLine'},
                                headerLabel: game.awayTeam.name,
                                subHeaderLabel: `MoneyLine. Full Game`,
                                valueLabel: 'V1',
                            })
                        .set(
                            1, {
                                header: 'X',
                                parsedHeader: game.allGameOdds[0]?.drawMoneyLine ?? -1,
                                value: game.allGameOdds[0] ? game.allGameOdds[0].drawMoneyLine?.toString() : "",
                                displayedValue: "",
                                isActive: state.games[index]?.oddCardMap?.get(1)?.isActive ?? false,
                                id: cyrb53(`${game.id}_${'drawMoneyLine'}`),
                                gameId: game.id,
                                gameTitle: `${game.awayTeam.name} vs ${game.homeTeam.name}`,
                                cardType: {name: 'drawMoneyLine'},
                                headerLabel: 'Draw',
                                subHeaderLabel: `MoneyLine. Full Game`,
                                valueLabel: 'V1',
                            })
                        .set(
                            2, {
                                header: '2',
                                parsedHeader: game.allGameOdds[0]?.homeMoneyLine ?? -1,
                                value: game.allGameOdds[0] ? game.allGameOdds[0]?.homeMoneyLine?.toString() : "",
                                displayedValue: "",
                                isActive: state.games[index]?.oddCardMap?.get(2)?.isActive ?? false,
                                id: cyrb53(`${game.id}_${'homeMoneyLine'}`),
                                gameId: game.id,
                                gameTitle: `${game.awayTeam.name} vs ${game.homeTeam.name}`,
                                cardType: {name: 'homeMoneyLine'},
                                headerLabel: game.homeTeam.name,
                                subHeaderLabel: 'MoneyLine. Full Game',
                                valueLabel: 'V1',
                            }
                        )
                        .set(
                            3, {
                                header: 'O ' + (game.allGameOdds[0]?.overUnder ? game.allGameOdds[0]?.overUnder?.toString() : "") ,
                                parsedHeader: game.allGameOdds[0]?.overUnder ?? -1,
                                value: game.allGameOdds[0] ? game.allGameOdds[0].overPayout?.toString() : "",
                                displayedValue: game.allGameOdds[0]? game.allGameOdds[0].overPayout?.toString() : "",
                                isActive: state.games[index]?.oddCardMap?.get(3)?.isActive ?? false,
                                id: cyrb53(`${game.id}_${'overPayout'}`),
                                gameId: game.id,
                                gameTitle: `${game.awayTeam.name} vs ${game.homeTeam.name}`,
                                cardType: {name: 'overPayout'},
                                headerLabel: 'Over',
                                subHeaderLabel: 'Total. Full Game',
                                valueLabel: 'V1',
                            }
                        )
                        .set(
                            4, {
                                header: 'U ' + (game.allGameOdds[0] ? game.allGameOdds[0].overUnder?.toString() : "") ,
                                parsedHeader: game.allGameOdds[0]?.overUnder ?? -1,
                                value: game.allGameOdds[0]? game.allGameOdds[0].underPayout?.toString() : "",
                                displayedValue: game.allGameOdds[0]? game.allGameOdds[0].underPayout?.toString() : "",
                                isActive: state.games[index]?.oddCardMap?.get(4)?.isActive ?? false,
                                id: cyrb53(`${game.id}_${'underPayout'}`),
                                gameId: game.id,
                                gameTitle: `${game.awayTeam.name} vs ${game.homeTeam.name}`,
                                cardType: {name: 'underPayout'},
                                headerLabel: 'Under',
                                subHeaderLabel: 'Total. Full Game',
                                valueLabel: 'V1',
                            }
                        )
                        .set(
                            5, {
                                header: '1 ' + (game.allGameOdds[0] ? (game.allGameOdds[0].awayPointSpread > 0 ? '  +' : '   ') + game.allGameOdds[0].awayPointSpread?.toString() : ""),
                                parsedHeader: game.allGameOdds[0]?.awayPointSpread ?? -1,
                                value: game.allGameOdds[0] ? game.allGameOdds[0].awayPointSpreadPayout?.toString() : "",
                                displayedValue: game.allGameOdds[0] ? game.allGameOdds[0].awayPointSpreadPayout?.toString() : "",
                                isActive: state.games[index]?.oddCardMap?.get(5)?.isActive ?? false,
                                id: cyrb53(`${game.id}_${'awayPointSpreadPayout'}`),
                                gameId: game.id,
                                gameTitle: `${game.awayTeam.name} vs ${game.homeTeam.name}`,
                                cardType: {name: 'awayPointSpreadPayout'},
                                headerLabel: game.awayTeam.name,
                                subHeaderLabel: 'Spread. Full Game',
                                valueLabel: 'V1',
                            }
                        )
                        .set(
                            6, {
                                header: '2 ' + (game.allGameOdds[0] ? (game.allGameOdds[0].homePointSpread > 0 ? '  +' : '   ') + game.allGameOdds[0].homePointSpread?.toString() : ""),
                                parsedHeader: game.allGameOdds[0]?.homePointSpread ?? -1,
                                value: game.allGameOdds[0] ? game.allGameOdds[0].homePointSpreadPayout?.toString() : "",
                                displayedValue: game.allGameOdds[0] ? game.allGameOdds[0].homePointSpreadPayout?.toString() : "",
                                isActive: state.games[index]?.oddCardMap?.get(6)?.isActive ?? false,
                                id: cyrb53(`${game.id}_${'homePointSpreadPayout'}`),
                                gameId: game.id,
                                gameTitle: `${game.awayTeam.name} vs ${game.homeTeam.name}`,
                                cardType: {name: 'homePointSpreadPayout'},
                                headerLabel: game.homeTeam.name,
                                subHeaderLabel: 'Spread. Full Game',
                                valueLabel: 'V1',
                            }
                        )),
                    
                    homeTeam: {
                        ...game.homeTeam,
                        imagePath: images(`./${teamIcons.find((teamIcon: TeamIcon) => teamIcon.abbrev === game.homeTeam.abbrev)?.path as string}`),
                        venue: {
                            ...game.homeTeam.venue,
                        }
                    },
                    awayTeam: {
                        ...game.awayTeam,
                        imagePath: images(`./${teamIcons.find((teamIcon: TeamIcon) => teamIcon.abbrev === game.awayTeam.abbrev)?.path as string}`),
                        venue: {
                            ...game.awayTeam.venue,
                        }
                    }
                }))
            })
        )
    //return getGamesSubscriber;
};
const GamesService = {

    init: () => {
        const method = 'GET';
        let url = 'games/allGames'
        requestFullGames(url, method)
            .subscribe(
                async (resultGamesPromise : Promise<Game[]>) => {
                    let resultGames = await resultGamesPromise;
                    
                    state = {
                        ...state,
                        games: 
                            [...resultGames],
                    };
                    subject.next({...state})

                }
            );
    },

    subscribe: (setState: any) => subject.subscribe(setState),

    post : (data: Game) => {
        let url = 'games/postGame'
        console.log({"url":url})
        console.log({"data":data});

        const method = 'POST';
        
        return request(url, method, data)
            .pipe(
                tap((itm) => {
                    console.log({"itm":itm}) 
                })
            );
    },

    getGames : () => {
       return state.games;
    },

    deleteGame : (url : string, id: number) => {
        const method = 'DELETE';
        if (id){
            url = `${url}/${id}`;
        }
        return request(url, method);
    },

    putGame : (url : string, data: any) => {
        const method = 'PUT';
        return request(url, method, data);
    },

    initialState,
}

export default GamesService;
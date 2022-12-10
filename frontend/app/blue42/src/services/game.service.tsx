import { Subject } from 'rxjs';
import {fromFetch} from 'rxjs/fetch';
import {switchMap, of, catchError, Observable, BehaviorSubject, tap, map} from 'rxjs';
import { useState } from 'react';
import { Game, OddCard, TeamIcon } from '../interfaces/interface';
import teamIconMapJson from '../assets/team-icons/team_icon_map.json';

const images = require.context('../../src/assets/team-icons', true);

export const getGamesSubscriber = new BehaviorSubject(new Observable((subscriber) => {
    subscriber.next(5);
}));

const headers = {
    "Content-type": "application/json"
};

function joinURL(baseURL : string, url: string){
    return `${baseURL}/${url}`;
}
const domain = "http://localhost:63919/api"

const request = (url : string, method : string ="POST", data: any[] | null = null) => {
    url = joinURL(domain, url);
    let reqInit : RequestInit = {
        headers: headers,
        method: method,
    }
    if (data){
        reqInit.body = JSON.stringify({...data});
    }
    console.log("in request");
    let req = new Request(url, reqInit);
    return fromFetch(req)
        .pipe(
            map(async (data: Response) => {
                let games: Game[] = await data.json();
                let teamIcons : TeamIcon[] = teamIconMapJson;

                return games.map((game) => ({
                    ...game,
                    oddCardMap: new Map<number, OddCard>()
                        .set(
                            0, {
                                header: '1',
                                value: game.allGameOdds[0] ? game.allGameOdds[0].awayMoneyLine?.toString() : "",
                                isActive: false,
                            })
                        .set(
                            1, {
                                header: 'X',
                                value: game.allGameOdds[0] ? game.allGameOdds[0].drawMoneyLine?.toString() : "",
                                isActive: false,
                            })
                        .set(
                            2, {
                                header: '2',
                                value: game.allGameOdds[0] ? game.allGameOdds[0]?.homeMoneyLine?.toString() : "",
                                isActive: false,
                            }
                        )
                        .set(
                            3, {
                                header: 'O ' + (game.allGameOdds[0] ? game.allGameOdds[0].overUnder?.toString() : "") ,
                                value: game.allGameOdds[0]? game.allGameOdds[0].overPayout?.toString() : "",
                                isActive: false,
                            }
                        )
                        .set(
                            4, {
                                header: 'U' + (game.allGameOdds[0] ? game.allGameOdds[0].overUnder?.toString() : "") ,
                                value: game.allGameOdds[0]? game.allGameOdds[0].underPayout?.toString() : "",
                                isActive: false,
                            }
                        )
                        .set(
                            5, {
                                header: '1 ' + (game.allGameOdds[0] ? (game.allGameOdds[0].awayPointSpread > 0 ? '  +' : '  ') + game.allGameOdds[0].awayPointSpread.toString() : ""),
                                value: game.allGameOdds[0] ? game.allGameOdds[0].awayPointSpreadPayout?.toString() : "",
                                isActive: false,
                            }
                        )
                        .set(
                            6, {
                                header: '2 ' + (game.allGameOdds[0] ? (game.allGameOdds[0].homePointSpread > 0 ? '  +' : '  ') + game.allGameOdds[0].homePointSpread.toString() : ""),
                                value: game.allGameOdds[0] ? game.allGameOdds[0].homePointSpreadPayout?.toString() : "",
                                isActive: false,
                            }
                        ),
                    
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
export const GamesService = {

    post : (url : string, data: any) => {
        const method = 'POST';
        return request(url, method, data);
    },

    getGames : () => {
        console.log("in getGames!");
        const method = 'GET';
        let url = 'games/allGames'
        return request(url, method);
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
    }   
}
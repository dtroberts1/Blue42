import {fromFetch} from 'rxjs/fetch';
import {Observable, BehaviorSubject, map, Subject, Observer, tap} from 'rxjs';
import teamIconMapJson from '../assets/team-icons/team_icon_map.json';
import { CardType, Game, GameOdd, OddCard } from '../interfaces/interface';
import React, { useEffect, useState } from 'react';
import GamesService from './game.service';

const subject = new Subject<InitialState>();
const domain = "http://localhost:63919/api";
const headers = {
    "Content-Type": "application/json"
};

type InitialState = {
    managementCards: OddCard[],
    games: Game[],
}
const initialState : InitialState= {
    managementCards: [],
    games: [],
}; 

const oddCardIsEmpty = (game: Game | undefined, card : OddCard) => {
    if (!game){
        return false;
    }
    
    type ObjectKey = keyof typeof game.allGameOdds[0];
    const key = card.cardType.name as ObjectKey;
    return game.allGameOdds[0] ? game.allGameOdds[0][key] ? false : true : true;
  }

function joinURL(baseURL : string, url: string){
    return `${baseURL}/${url}`;
}

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

let state = initialState;
  
const GameOddService = {

    init: () => {
        GamesService.subscribe((gameServiceState: any) => {
            let retrievedGames : Game[] = gameServiceState.games;

            let myMap = new Map<number, OddCard>();

            let allMgmtCards : OddCard[] = retrievedGames.map((g: Game) => Array.from(g.oddCardMap.values()))
                .reduce((a :any,b: any) => a.concat(b));

            
            allMgmtCards.forEach((c) => {
                c.cardClosed = () => {
                    c.isActive = false;
                  };
            });

            for (let i = 0; i < allMgmtCards.length; i++){
                myMap.set(allMgmtCards[i].id as number, allMgmtCards[i]);
            }

            let newCards : OddCard[] = [];

            if (Array.isArray(state.managementCards) && state.managementCards.length){
                state.managementCards.forEach((mgmtCard) => {
                    let matchedCard = myMap.get(mgmtCard.id as number);
                    if (matchedCard){
                        newCards.push({
                            ...matchedCard,
                            isActive: mgmtCard.isActive,
                            cardMode: oddCardIsEmpty(retrievedGames.find(g => g.id === matchedCard?.gameId), matchedCard) ? "add" : "update",
                        })
                    }
                });
            }

            state = {
                ...state,
                games: gameServiceState.games,
                managementCards: newCards,
            };
            subject.next({...state})
        });
    },
    subscribe: (setState: any) => subject.subscribe(setState),
    setManagementCards: (oddCards: OddCard[]) => {
        state = {
            ...state,
            managementCards: [
            ...oddCards,
            ]
        };
        subject.next(state)
    },
    addManagementCard: (oddCard: OddCard) => {
        state = {
            ...state,
            managementCards: 
                [...state.managementCards.filter(card => card.id !== oddCard.id), oddCard],
        };
        subject.next({...state})
    },
    removeManagementCard: (oddCardId: number) => {
        let existingCard = state.managementCards.find(card => card.id === oddCardId);
        if (existingCard){
            if (typeof existingCard.cardClosed === 'function') {
                // Remove active status of card if it has been removed from card mgmt area.
                existingCard.cardClosed();
              }
        }
        
        state = {
            ...state,
            managementCards:
                [...state.managementCards.filter(card => card.id !== oddCardId)]
        };
        subject.next({...state})
    },
    createNewOddCard(oddCardId: number, header: string | null, value: string | null){
    },
    saveManagementCard: (oddCardId: number, header: string | null, value: string | null) => {

        // Find the GameOdd for the provided OddCard (id) and update its specific properties.
        let oddCard = state.managementCards.find(card => card.id === oddCardId);

        if (oddCard){
            // Required parameters
            // Game, Card Type. It should accept all values (up to 2) from the frontend for the specific card type
            let myGames = GamesService.getGames();
            let allGameOdds = myGames.map(g => g.allGameOdds).reduce((a,b) => a.concat(b));
            let matchedGameOdd = allGameOdds.find(gO => gO.gameId === oddCard?.gameId);
            if (matchedGameOdd){
                (matchedGameOdd.game as any) = {
                    id: matchedGameOdd.gameId,
                };
                (matchedGameOdd.book as any) = {
                    id: 1, /* Remove!!! */
                };
            }

            type ObjectKey = keyof typeof allGameOdds[0];
            const key = oddCard?.cardType.name as ObjectKey;
            let updatedAttributes : any = {};
            let category = '';
            let innerCategory = '';
            
            if (header && (key === 'awayMoneyLine' || key === 'homeMoneyLine' || key === 'drawMoneyLine')){
                updatedAttributes[key] = Number.parseInt(header);
                category = 'moneyLine';
                innerCategory = key[0].toUpperCase() + key.slice(1);
            }

            else if(key === 'awayPointSpreadPayout'){
                if (header){
                    updatedAttributes.awayPointSpread = Number.parseFloat(header);
                }
                if (value){
                    updatedAttributes[key] = Number.parseInt(value);
                }
                category = 'spread';
                innerCategory = 'AwaySpread';
            }
            else if(key === 'homePointSpreadPayout'){
                if (header){
                    updatedAttributes.homePointSpread = Number.parseFloat(header);
                }
                if (value){
                    updatedAttributes[key] = Number.parseInt(value);  
                }
                category = 'spread';
                innerCategory = 'HomeSpread';
            }
            else if (key === 'overPayout' || key === 'underPayout'){
                if (header){
                    updatedAttributes.overUnder = Number.parseFloat(header);
                }
                if (value){
                    updatedAttributes[key] = Number.parseInt(value); 
                }
                category = 'overUnder';
                innerCategory = key[0].toUpperCase() + key.slice(1);
            }
    
            if (matchedGameOdd){
                const url = joinURL(domain, 'gameodds/putGameOdd');
                let reqInit : RequestInit = {
                    headers: headers,
                    method: 'PUT',
                    body: JSON.stringify({
                        ...matchedGameOdd,
                        ...updatedAttributes
                    }),
                };

                let req = new Request(url + "?" + new URLSearchParams({
                    changeCategory: category,
                    innerCategory: innerCategory
                }), reqInit);
                return fromFetch(req)
                    .subscribe(
                        res => {
                            GamesService.init();
                        }
                    );
            }
        }
    },

    createNewGameOdd: (data: GameOdd) => {
        let url = 'gameodds/postGameOdd'
        console.log({"url":url})
        console.log({"data":data});

        const method = 'POST';
        
        return request(url, method, data)
            .pipe(
                tap((itm) => {
                    console.log({"itm":itm}) 
                    GamesService.init();
                })
            );
    },
    initialState
}

export default GameOddService 
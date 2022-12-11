import {fromFetch} from 'rxjs/fetch';
import {Observable, BehaviorSubject, map, Subject, Observer} from 'rxjs';
import teamIconMapJson from '../assets/team-icons/team_icon_map.json';
import { OddCard } from '../interfaces/interface';

const subject = new Subject();

type InitialState = {
    managementCards: OddCard[],
}
const initialState : InitialState= {
    managementCards: [],
}; 

let state = initialState;
  
const GameOddService = {

    init: () => {
        state = {
            ...state
        };
        subject.next(initialState)
    },
    subscribe: (setState: any) => subject.subscribe(setState),
    setManagementCards: (oddCards: OddCard[]) => {
        state = {
            managementCards: {
            ...oddCards,
            }
        };
        subject.next(state)
    },
    addManagementCard: (oddCard: OddCard) => {
        state = {
            managementCards: 
                [...state.managementCards.filter(card => card.id !== oddCard.id), oddCard],
        };
        subject.next({...state})
    },
    removeManagementCard: (oddCard: OddCard) => {
        state = {
            managementCards:
                [...state.managementCards.filter(card => card.id !== oddCard.id )]
        };
        subject.next({...state})
    },
    initialState
}

export default GameOddService 
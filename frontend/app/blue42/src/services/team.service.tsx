import {fromFetch} from 'rxjs/fetch';
import {map, Subject} from 'rxjs';
import { Team, TeamIcon } from '../interfaces/interface';
import teamIconMapJson from '../assets/team-icons/team_icon_map.json';
import {importFi} from '../ImportFi';

type InitialState = {
    teams: Team[],
}
const subject = new Subject<InitialState>();
const images = require.context('../assets/team-icons', true);// importFi.importFiles();
console.log({"images":images})

const headers = {
    "Content-type": "application/json"
};

function joinURL(baseURL : string, url: string){
    return `${baseURL}/${url}`;
}
const domain = "http://localhost:63919/api";

const initialState : InitialState = {
    teams: [],
};
let state = initialState;

const request = (url : string, method : string ="POST", data: any[] | null = null) => {
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
    //return getGamesSubscriber;
};
const TeamsService = {

    init: () => {
        const method = 'GET';
        let url = 'teams/allTeams'

        request(url, method)
            .pipe(
                map(async (data: Response) => {
                    let teams: Team[] = await data.json();
                    let teamIcons : TeamIcon[] = teamIconMapJson;

                    return teams.map((t: Team) => {
                        return {
                            ...t,
                            imagePath: images(`./${teamIcons.find((teamIcon: TeamIcon) => teamIcon.abbrev === t.abbrev)?.path ?? '' as string}`),
                        } as Team
                    });
                })
            )
            .subscribe(
                async (resTeams: Promise<Team[]>) => {
                    let currTeams : Team[] = await resTeams;
                    state = {
                        ...state,
                        teams: 
                            [...currTeams],
                    };

                    subject.next({...state});
                }
            )
    },

    subscribe: (setState: any) => subject.subscribe(setState),

    post : (url : string, data: any) => {
        const method = 'POST';
        return request(url, method, data);
    },

    getTeams : () => {
       return state.teams;
    }
    ,
    initialState,
}

export default TeamsService;
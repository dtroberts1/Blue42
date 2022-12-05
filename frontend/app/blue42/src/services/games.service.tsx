import { Subject } from 'rxjs';
import {fromFetch} from 'rxjs/fetch';
import {switchMap, of, catchError} from 'rxjs';

const subject = new Subject();
/*
export const messageService = {
    sendMessage: message => subject.next({ text: message }),
    clearMessages: () => subject.next(),
    getMessage: () => subject.asObservable()
};
*/


const headers = {
    "Content-type": "application/json"
};

function joinURL(baseURL : string, url: string){
    return `${baseURL}/${url}`;
}

export default class GamesService {
    domain: string;

    constructor(){
        this.domain = "http://localhost:63919/api/"
    }

    request(url : string, method : string ="POST", data: any[] | null = null) : Promise<any>{
        url = joinURL(this.domain, url);
        const options : {headers: { "Content-type": string; }, method: string, body?: string}= {
            headers,
            method,
        }
        if (data){
            options.body = JSON.stringify({...data});
        }

        /*
        fromFetch(url, options, pipe(
            
        ));*/

        /*fetch(url, options);*/
        return fetch(url, options);
    }

    post(url : string, data: any){
        const method = 'POST';
        return this.request(url, method, data).then(res => res.json());
    }

    get(url : string, id: number){
        const method = 'GET';
        if (id){
            url = `${url}/${id}`;
        }
        return this.request(url, method).then(res => res.json());
    }

    delete(url : string, id: number){
        const method = 'DELETE';
        if (id){
            url = `${url}/${id}`;
        }
        return this.request(url, method).then(res => res.json());
    }

    put(url : string, data: any){
        const method = 'PUT';
        return this.request(url, method, data).then(res => res.json());
    }
}
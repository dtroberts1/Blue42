import { Subject } from 'rxjs';
import {fromFetch} from 'rxjs/fetch';
import {switchMap, of, catchError, Observable} from 'rxjs';
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
        this.domain = "http://localhost:63919/api"
    }

    request(url : string, method : string ="POST", data: any[] | null = null) : Observable<Response>{
        url = joinURL(this.domain, url);
        let reqInit : RequestInit = {
            headers: headers,
            method: method,
        }
        if (data){
            reqInit.body = JSON.stringify({...data});
        }
        let req = new Request(url, reqInit);
        
        return fromFetch(req);
    }

    post(url : string, data: any): Observable<Response>{
        const method = 'POST';
        return this.request(url, method, data);
    }

    public get(url : string, id: number): Observable<Response>{
        const method = 'GET';
        if (id){
            url = `${url}/${id}`;
        }
        return this.request(url, method);
    }

    delete(url : string, id: number): Observable<Response>{
        const method = 'DELETE';
        if (id){
            url = `${url}/${id}`;
        }
        return this.request(url, method);
    }

    put(url : string, data: any): Observable<Response>{
        const method = 'PUT';
        return this.request(url, method, data);
    }
}
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

const ENDPOINT_PATH = Object.freeze({
	LOGIN : '/user/authenticate',
	REGISTER : '/user/register',
	ALL_USERS : '/users/findAll',
	DELETE: '/user'
});

export default abstract class BaseService {
    
    private BASE_URL = (environment.apiUrl == '')? (location.protocol + '//' + location.host) : environment.apiUrl
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(protected http: HttpClient) {}
    
    post(path:string, body:any): Observable<any> {
        var url = ENDPOINT_PATH[path];
        url = `${this.BASE_URL}${url}`;
        let options = {headers: this.headers, withCredentials : true, observe: 'response' as 'response'}
        
		return this.http.post(url, body, options)
    }

	get(path:string): Observable<any> {
        var url = ENDPOINT_PATH[path];
        url = `${this.BASE_URL}${url}`;
        
		return this.http.get(url)
    }

	delete(path:string, id:number): Observable<any> {
        var url = ENDPOINT_PATH[path];
        url = `${this.BASE_URL}${url}/${id}`;
        
		return this.http.delete(url)
    }
}
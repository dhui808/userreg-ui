import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { User } from '../models';
import { environment } from '../../environments/environment';
import BaseService from './base.service'

@Injectable({ providedIn: 'root' })
export class UserService extends BaseService {
    constructor(http: HttpClient) { super(http) }

    getAll() {
        return this.get('ALL_USERS')
			.pipe(map(response => response.users));
    }

    register(user: User) {
        return this.post('REGISTER', user);
    }

    deleteUser(id: number) {
        return this.delete('DELETE', id);
    }
}
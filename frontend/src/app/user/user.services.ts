import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppConfig } from "../api.config";

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { User } from "./user.model";

@Injectable({ providedIn: 'root' })

export class UserService {
    private apiUrl = AppConfig.apiUrl;

    private currentUser: User | null = null;

    constructor(private http: HttpClient) {
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);

            this.currentUser = new User(
                user.user,
                user.senha
            );
        }
    }

    addAccount(user: { user: string, senha: string }) {
        this.http.post<User>(`${this.apiUrl}/api/users`, user).subscribe(
            (response) => {
                alert('Conta criada com sucesso!');
            },
            (error) => {
                console.error('Erro ao criar conta:', error);
            }
        );
    }

    getAccount(account: User): Observable<User | null> {
        return this.http.get<User[]>(`${this.apiUrl}/api/users`).pipe(
            map((users: User[]) => {
                if (users && users.length > 0) {
                    const findUser = users.find(u => u.user === account.user && u.senha === account.senha);
                    return findUser || null;
                } else {
                    return null;
                }
            }),
            catchError((error) => {
                console.log('Error: ', error);
                return of(null);
            })
        );
    }

    getAllAccounts(): Observable<User[]> {
        return this.http.get<User[]>(`${this.apiUrl}/api/users`);
    }

    setCurrentUser(user: User | null) {
        this.currentUser = user;
        if (user) {
            sessionStorage.setItem('user', JSON.stringify({
                user: user.user,
                senha: user.senha
            }));
        } else {
            sessionStorage.removeItem('user');
        }
    }

    getCurrentUser(): User | null {
        return this.currentUser;
    }

    getLogout() {
        sessionStorage.removeItem('user')
        this.setCurrentUser(null);
    }
}
import { Component, inject} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from '@angular/router';

import { UserService } from "./user.services";
import { User } from "./user.model";

@Component ({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './login.component.html',
    styleUrl: './user.component.css'
})

export class LoginComponent {
    constructor(private router: Router) { }
    private userService = inject(UserService);

    onLogin() {
        const userElement = document.getElementById('user') as HTMLInputElement;        
        const passwordElement = document.getElementById('senha') as HTMLInputElement;        
        const login = new User(userElement.value, passwordElement.value);

        this.userService.getAccount(login).subscribe(
            (loggedInUser) => {
                if (loggedInUser) {
                    this.userService.setCurrentUser(loggedInUser);
                    alert('Login realizado com sucesso');
                    this.router.navigate(['/tasks']);
                } else if (login.user === '' || login.senha === '') {
                    alert('Preencha todos os campos!');
                } else if(login.senha !== loggedInUser) {
                    alert('E-mail ou senha incorreta!');
                } else {
                    alert('Usuário não encontrado!')
                }
            },
            (error) => {
                console.error("Error: ", error);
            }
        );
    }
}
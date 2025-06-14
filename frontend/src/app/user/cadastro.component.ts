import { Component, inject } from "@angular/core";
import { UserService } from "./user.services";
import { FormsModule } from "@angular/forms";

@Component ({
    selector: 'app-cadastro',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './cadastro.component.html',
    styleUrl: './user.component.css'
})

export class CadastroComponent {
    private userService = inject(UserService);

    onCreateAccount() {
        let user = (document.getElementById('user') as HTMLInputElement).value;
        let senha = (document.getElementById('senha') as HTMLInputElement).value;
    
        if (!user || !senha) {
            alert('Preencha os campos obrigatórios');
            return;
        }
    
        this.userService.getAllAccounts().subscribe(users => {
            const usuarioExistente = users.find(u => u.user === user);
    
            if (usuarioExistente) {
                alert('Usuário já cadastrado');
                return;
            }
    
            const newUser = { user, senha };
    
            this.userService.addAccount(newUser);
        });
    }
}
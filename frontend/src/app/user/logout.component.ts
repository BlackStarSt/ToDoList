import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from '@angular/router';

import { UserService } from "./user.services";

@Component({
    selector: 'app-logout',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './logout.component.html',
    styleUrl: './user.component.css'
})

export class LogoutComponent {
    constructor(private router: Router) { }
    private userService = inject(UserService);

    onLogout() {
        this.userService.getLogout();

        alert('Logout realizado com sucesso!');
        this.router.navigate(['/login']);
    }
}
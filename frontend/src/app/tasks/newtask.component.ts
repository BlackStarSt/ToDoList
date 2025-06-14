import { Component, inject } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { Router } from '@angular/router';

import { TaskService } from "./tasks.services";
import { UserService } from "../user/user.services";

import { Task } from "./task.model";

@Component ({
    selector: 'app-newtasks',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './newtask.component.html',
    styleUrl: './tasks.component.css'
})

export class NewTasksComponent {
    private tasksService = inject(TaskService);
    private userService = inject(UserService);

    constructor(private router: Router) { }
    
    onSubmit(form: NgForm) {
        const user = this.userService.getCurrentUser();

        if (user) {
           const taskAux = new Task(user.user, form.value.myContentngForm);
           this.tasksService.addTask(taskAux);
           console.log(taskAux);
        } else {
            alert('É preciso estar logado para enviar mensagem.');
            this.router.navigate(['/login']);
        }
    }
}
import { Component, OnInit, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common"; 

import { NewTasksComponent } from "./newtask.component";
import { TasksComponent } from "./tasks.component";

import { Task } from "./task.model";
import { User } from "../user/user.model";

import { TaskService } from "./tasks.services";
import { UserService } from "../user/user.services";

@Component({
    selector: 'app-list-tasks',
    standalone: true,
    imports: [FormsModule, TasksComponent, HttpClientModule, NewTasksComponent, CommonModule],
    template: `
        <div class="container">
            <app-newtasks></app-newtasks>
            <div class="list" [ngClass]="{'no-user': !currentUser}">
                <div *ngFor="let tsk of taskS; let i = index">
                    <app-tasks [taskItem]="tsk"></app-tasks>
                </div>
            </div>
        </div>
    `,
    styleUrl: './tasks.component.css',
})

export class ListTasksComponent implements OnInit {

    taskS: Task[] = [];
    currentUser: User | null = null;

    private tasksService = inject(TaskService);
    private userService = inject(UserService);

    constructor() { }

    ngOnInit(): void {
        this.currentUser = this.userService.getCurrentUser();
        if (this.currentUser) {
            this.tasksService.getTasks().subscribe();

            this.tasksService.getTasksObservable().subscribe((tasks) => {
                this.taskS = tasks.filter(task => task.username === this.currentUser?.user);
            });
        }
    }

    deleteMessage(task: Task) {
        this.tasksService.deleteTask(task);
    }
}
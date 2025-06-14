import { Component, inject, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UserService } from "../user/user.services";
import { TaskService } from "./tasks.services";

import { Task } from "./task.model";
import { User } from "../user/user.model";

@Component({
    selector: 'app-tasks',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './tasks.component.html',
    styleUrl: './tasks.component.css'
})

export class TasksComponent {
    @Input() taskItem: Task = new Task("", "");

    public currentUser: User | null;
    public userImage: string | null = null;

    private userService = inject(UserService);
    private taskService = inject(TaskService);

    constructor(userService: UserService) {
        this.currentUser = userService.getCurrentUser();
    }

    @Output() outputMessage = new EventEmitter<string>();

    onDelete() {
        const user = this.userService.getCurrentUser();

        if (user) {
            this.taskService.deleteTask(this.taskItem);
        } else {
            alert('É necessário estar logado para apagar suas mensagens!');
        }
    }

    onCheckChange(_id: string | undefined, event: Event): void {
        if (!_id) {
            console.error('ID não encontrado!');
            return;
        }

        const inputElement = event.target as HTMLInputElement;
        const isChecked = inputElement.checked;

        this.taskService.editTaskCompleted(_id, isChecked, this.taskItem).subscribe({
            next: (updatedTask: Task) => {
                if (this.taskItem) {
                    this.taskItem.completed = updatedTask.completed;
                } else {
                    console.warn('taskItem está indefinido!.');
                }
            },
            error: (err: any) => {
                console.error('Erro ao atualizar status:', err);
                console.error('Erro:', JSON.stringify(err));
                inputElement.checked = !isChecked;
            }
        });
    }

    isChecked(_id: string): boolean {
        return this.taskItem.completed;
    }
}
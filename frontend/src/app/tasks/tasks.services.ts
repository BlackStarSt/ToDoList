import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, BehaviorSubject, tap} from "rxjs";

import { Task } from "./task.model";

@Injectable({ providedIn: 'root' })

export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  private taskSService: Task[] = [];

  constructor(private http: HttpClient) { }

  addTask(task: Task) {
    this.http.post<Task>('/api/tasks', task).subscribe(
      (response) => {
        this.taskSService.push(response);
        this.tasksSubject.next([...this.taskSService]);
      },
      (error) => {
        console.log('Error:', error);
      }
    );
  }

  deleteTask(task: Task) {
    this.http.delete(`/api/tasks/${task._id}`).subscribe(() => {
      this.taskSService = this.taskSService.filter(
        (m) => m._id !== task._id
      );
      this.tasksSubject.next([...this.taskSService]);
    });
  }

  editTaskCompleted(_id: string, completed: boolean, task: Task): Observable<Task> {
    const url = `/api/tasks/${task._id}`;
    const body = { completed };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put<Task>(url, body, { headers });
  }

  getTasksObservable(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('/api/tasks').pipe(
      tap((task) => {
        this.taskSService = task;
        this.tasksSubject.next([...this.taskSService]);
      })
    );
  }
}
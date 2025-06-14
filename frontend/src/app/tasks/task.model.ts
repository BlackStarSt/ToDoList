export class Task {
    _id?: string;
    date?: Date = new Date();
    username?: string;
    content?: string;
    completed: boolean;

    constructor(username: string, content: string, date: Date = new Date(), completed: boolean = false) {
        this.username = username;
        this.content = content;
        this.date = date;
        this.completed = completed;
      }
}
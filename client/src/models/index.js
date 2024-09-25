export class Task {
    constructor() {
        this.id = 0;
        this.description = "";
        this.completed = false;
        this.subtasks = [];
    }

    loadFromJSON(json) {
        this.id = json.id;
        this.description = json.description;
        this.completed = json.completed;
        if (Array.isArray(json.subtasks) && json.subtasks.length > 0) {
            this.subtasks = json.subtasks.map(st => {
                const subtask = new SubTask();
                subtask.loadFromJSON(st);
            });
        }
        return this;
    }
}

export class SubTask {
    constructor() {
        this.subId = 0;
        this.description = "";
        this.completed = false;
    }

    loadFromJSON(json) {
        this.subId = json.subId;
        this.description = json.description;
        this.completed = json.completed;
        return this;
    }
}
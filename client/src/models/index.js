import { sortTodos } from "../utils";

export class Task {
    constructor() {
        this.id = "";
        this.order = 0;
        this.description = "";
        this.completed = false;
        this.subtasks = [];
        this.isPriority = false;
    }

    loadFromJSON(json) {
        this.id = json.id;
        this.description = json.description;
        this.completed = json.completed;
        this.order = json.order;
        this.isPriority = json.isPriority;
        if (Array.isArray(json.subtasks) && json.subtasks.length > 0) {
            let subtaskCompletedCounter = 0;
            this.subtasks = json.subtasks.map(st => {
                if (st.completed) {
                    subtaskCompletedCounter++;
                }
                const subtask = new SubTask();
                return subtask.loadFromJSON(st);
            }).sort(sortTodos);
            this.completed = subtaskCompletedCounter === this.subtasks.length;
        }
        return this;
    }
}

export class SubTask {
    constructor() {
        this.id = "";
        this.order = 0;
        this.description = "";
        this.completed = false;
        this.isPriority = false;
    }

    loadFromJSON(json) {
        this.id = json.id;
        this.order = json.order;
        this.description = json.description;
        this.completed = json.completed;
        this.isPriority = json.isPriority;
        return this;
    }
}
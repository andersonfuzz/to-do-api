import { TaskStatus, TaskPriority } from "./TaskEnums.js";

export default class TaskModel {
    constructor(
        name,
        description = "",
        status = TaskStatus.PENDING,
        priority = TaskPriority.NORMAL,
        dueDate = null
    ) {
        if (!name) throw new Error("Task must have a name");
        if (!Object.values(TaskStatus).includes(status)) {
            throw new Error(`Invalid status: ${status}`);
        }
        if (!Object.values(TaskPriority).includes(priority)) {
            throw new Error(`Invalid priority: ${priority}`);
        }

        this.name = name;
        this.description = description;
        this.status = status;
        this.priority = priority;
        this.dueDate = dueDate ? new Date(dueDate) : null;
        this.createdAt = new Date();
    }
    toggleStatus() {
        if (this.status === TaskStatus.DONE) {
            this.status = TaskStatus.PENDING;
        } else {
            this.status = TaskStatus.DONE;
        }
    }

    markAsDone() {
        this.status = TaskStatus.DONE;
    }

    isOverdue() {
        return (
            this.dueDate &&
            new Date() > this.dueDate &&
            this.status !== TaskStatus.DONE
        );
    }

    changePriority(newPriority) {
        if (!Object.values(TaskPriority).includes(newPriority)) {
            throw new Error(`Invalid priority: ${newPriority}`);
        }
        this.priority = newPriority;
    }
}

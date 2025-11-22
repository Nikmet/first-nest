import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDTO } from "./dto/createTask.dto";
import { UpdateTaskDTO } from "./dto/updateTask.dto";

@Injectable()
export class TaskService {
    private tasks = [
        {
            id: 1,
            title: "Learn NestJs",
            isCompleted: false
        },
        {
            id: 2,
            title: "Build Api",
            isCompleted: true
        }
    ];

    findAll() {
        return this.tasks;
    }

    findById(id: number) {
        const task = this.tasks.find(t => t.id === id);

        if (!task) {
            throw new NotFoundException("Task not found");
        }

        return task;
    }

    createTask(dto: CreateTaskDTO) {
        const { title } = dto;

        const newTask = {
            id: this.tasks.length + 1,
            title,
            isCompleted: false
        };
        this.tasks.push(newTask);
        return this.tasks;
    }

    updateTask(id: number, dto: UpdateTaskDTO) {
        const { isCompleted, title } = dto;
        const task = this.tasks.find(t => t.id === id);

        if (!task) {
            throw new NotFoundException("Task not found");
        }

        task.title = title;
        task.isCompleted = isCompleted;
        return task;
    }

    patchTask(id: number, dto: Partial<UpdateTaskDTO>) {
        const task = this.findById(id);
        Object.assign(task, dto);
        return task;
    }

    deleteTask(id: number) {
        const task = this.findById(id);
        this.tasks.filter(t => t.id !== task.id);
        return this.tasks;
    }
}

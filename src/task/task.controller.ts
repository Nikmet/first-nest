import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { TaskService } from "./task.service";
import { CreateTaskDTO } from "./dto/createTask.dto";
import { UpdateTaskDTO } from "./dto/updateTask.dto";

@Controller("task")
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get("all")
    findAll() {
        return this.taskService.findAll();
    }

    @Get("by/:id")
    findById(@Param("id") id: string) {
        return this.taskService.findById(+id);
    }

    @Post("")
    createTask(@Body() dto: CreateTaskDTO) {
        return this.taskService.createTask(dto);
    }

    @Put("/update/:id")
    updateTask(@Param("id") id: string, @Body() dto: UpdateTaskDTO) {
        return this.taskService.updateTask(+id, dto);
    }

    @Patch("/update/:id")
    patchUpdateTask(@Param("id") id: string, @Body() dto: Partial<UpdateTaskDTO>) {
        return this.taskService.patchTask(+id, dto);
    }

    @Delete("delete/:id")
    deleteTask(@Param("id") id: string) {
        return this.taskService.deleteTask(+id);
    }
}

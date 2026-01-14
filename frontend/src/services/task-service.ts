import { BaseService } from './base-service';
import { Task, CreateTaskData, UpdateTaskData, ApiResponse } from '../lib/types';

export class TaskService extends BaseService {
  private readonly basePath = '/tasks';

  async getAll(): Promise<ApiResponse<Task[]>> {
    return this.get<Task[]>(this.basePath);
  }

  async getById(id: string): Promise<ApiResponse<Task>> {
    return this.get<Task>(`${this.basePath}/${id}`);
  }

  async create(taskData: CreateTaskData): Promise<ApiResponse<Task>> {
    return this.post<Task>(this.basePath, taskData);
  }

  async update(id: string, taskData: UpdateTaskData): Promise<ApiResponse<Task>> {
    return this.put<Task>(`${this.basePath}/${id}`, taskData);
  }

  async deleteById(id: string): Promise<ApiResponse<null>> {
    return this.delete<null>(`${this.basePath}/${id}`);
  }

  async toggleCompletion(id: string, completed: boolean): Promise<ApiResponse<Task>> {
    return this.patch<Task>(`${this.basePath}/${id}/toggle`, { completed });
  }
}

// Create a singleton instance
const taskService = new TaskService();

export default taskService;
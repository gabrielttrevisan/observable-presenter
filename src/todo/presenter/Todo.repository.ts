import { Todo } from '../model'
import { TodoService } from './Todo.service'

export interface TodoRepository {
  getToDos(): Promise<Todo[]>

  create(title: string, description: string): Promise<Todo>
}

export class V1TodoRepository implements TodoRepository {
  #service: TodoService

  constructor(todoService: TodoService) {
    this.#service = todoService
  }

  async getToDos(): Promise<Todo[]> {
    return new Promise<Todo[]>(async (resolve, reject) => {
      try {
        const todos = await this.#service.get()

        resolve(todos)
      } catch (e: unknown) {
        reject(e)
      }
    })
  }

  async create(title: string, description: string): Promise<Todo> {
    return new Promise<Todo>(async (resolve, reject) => {
      try {
        const todo = await this.#service.create(title, description)

        resolve(todo)
      } catch (e: unknown) {
        reject(e)
      }
    })
  }
}

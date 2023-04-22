import { Todo, createTodo } from '../model'

export interface TodoService {
  get(): Promise<Todo[]>
  create(title: string, description: string): Promise<Todo>
}

export class V1TodoService implements TodoService {
  async get(): Promise<Todo[]> {
    return new Promise<Todo[]>(async (resolve, reject) => {
      try {
        const todos = localStorage.getItem('todos')

        const parsedTodos = (todos ? JSON.parse(todos) : []) as Todo[]
        resolve(parsedTodos)
      } catch (e: unknown) {
        reject(e)
      }
    })
  }

  async create(title: string, description: string): Promise<Todo> {
    return new Promise<Todo>(async (resolve, reject) => {
      try {
        const newTodo = createTodo(title, description)
        const todos = localStorage.getItem('todos')
        const parsedTodos = todos ? JSON.parse(todos) : []

        parsedTodos.push(newTodo)
        localStorage.setItem('todos', JSON.stringify(parsedTodos))
        resolve(newTodo)
      } catch (e: unknown) {
        reject(e)
      }
    })
  }
}

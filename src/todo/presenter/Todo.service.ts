import { Todo, createTodo } from './Todo.model'

export interface TodoService {
  get(): Promise<Todo[]>
  create(title: string, description: string): Promise<Todo>
}

export class V1TodoService implements TodoService {
  async get(): Promise<Todo[]> {
    return new Promise<Todo[]>(async (resolve, reject) => {
      try {
        const todos = localStorage.getItem('todos')

        setTimeout(() => {
          const parsedTodos = (todos ? JSON.parse(todos) : []) as Todo[]
          resolve(parsedTodos)
        }, Math.random() * 1000)
      } catch (e: unknown) {
        reject(e)
      }
    })
  }

  async create(title: string, description: string): Promise<Todo> {
    return new Promise<Todo>(async (resolve, reject) => {
      try {
        setTimeout(() => {
          const newTodo = createTodo(title, description)
          const todos = localStorage.getItem('todos')
          const parsedTodos = todos ? JSON.parse(todos) : []

          parsedTodos.push(newTodo)
          localStorage.setItem('todos', JSON.stringify(parsedTodos))
          resolve(newTodo)
        }, Math.random() * 1000)
      } catch (e: unknown) {
        reject(e)
      }
    })
  }
}

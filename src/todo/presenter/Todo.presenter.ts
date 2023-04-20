import { IsPresenter } from '../../presenter'
import { Todo } from './Todo.model'
import { TodoRepository } from './Todo.repository'

export type TodoList = Map<string, Todo>

export type ToDoModel = {
  list: TodoList
  loading: boolean
}

export interface TodoPresenter {
  get(): Promise<void>
  create(title: string, description: string): Promise<void>
}

export class V1TodoPresenter extends IsPresenter<ToDoModel> {
  #repository: TodoRepository

  constructor(repository: TodoRepository) {
    super({
      list: new Map<string, Todo>(),
      loading: false,
    })

    this.#repository = repository
  }

  get = async (): Promise<void> => {
    this.next({ loading: true })

    const todos = await this.#repository.getToDos()

    this.next({
      loading: false,
      list: new Map<string, Todo>(
        todos.reduce<[string, Todo][]>((a, todo) => [...a, [todo.id, todo]], [])
      ),
    })
  }

  create = async (title: string, description: string): Promise<void> => {
    this.next({ loading: true })
    await this.#repository.create(title, description)

    const todos = await this.#repository.getToDos()

    this.next({
      loading: false,
      list: new Map<string, Todo>(
        todos.reduce<[string, Todo][]>((a, todo) => [...a, [todo.id, todo]], [])
      ),
    })
  }
}

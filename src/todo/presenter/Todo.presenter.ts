import { ObservablePresenter } from '../../presenter'
import { ToDoModel, Todo } from '../model'
import { TodoRepository } from './Todo.repository'

export interface TodoPresenter {
  get(): Promise<void>
  create(title: string, description: string): Promise<void>
}

export class V1TodoPresenter extends ObservablePresenter<ToDoModel> {
  #repository: TodoRepository

  constructor(repository: TodoRepository) {
    super({
      list: new Map<string, Todo>(),
      loading: false,
    })

    this.#repository = repository
  }

  get = async (): Promise<void> => {
    this.nextPartial({ loading: true })

    const todos = await this.#repository.getToDos()

    this.next({
      loading: false,
      list: new Map<string, Todo>(
        todos.reduce<[string, Todo][]>((a, todo) => [...a, [todo.id, todo]], [])
      ),
    })
  }

  create = async (title: string, description: string): Promise<void> => {
    this.nextPartial({ loading: true })
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

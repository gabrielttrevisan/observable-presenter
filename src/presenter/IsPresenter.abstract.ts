import { Model, Presenter, Subscriber, Unsubscriber } from './types'

export abstract class IsPresenter<T extends Model> implements Presenter<T> {
  #model: T
  #subscribers: Set<Subscriber<T>>

  constructor(model: T) {
    this.#model = model
    this.#subscribers = new Set<Subscriber<T>>()
  }

  get model() {
    return this.#model
  }

  subscribe = (subscriber: Subscriber<T>): Unsubscriber => {
    this.#subscribers.add(subscriber)

    return () => {
      this.#subscribers.delete(subscriber)
    }
  }

  getSnapshot = (): T => {
    return this.#model
  }

  protected next = (current: Partial<T>) => {
    const previous = this.#model

    this.#model = {
      ...previous,
      ...current,
    }

    this.#subscribers.forEach((subscriber) => subscriber(this.#model, previous))
  }
}

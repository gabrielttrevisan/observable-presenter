import { Model, Presenter, Subscriber, Unsubscriber } from './types'

export abstract class ObservablePresenter<T extends Model> implements Presenter<T> {
  static isPresenter<U extends Model>(ins: unknown): ins is ObservablePresenter<U> {
    return ins instanceof ObservablePresenter
  }

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

  protected nextPartial = (current: Partial<T>) => {
    const previous = this.#model

    this.#model = {
      ...previous,
      ...current,
    }

    this.#subscribers.forEach((subscriber) => subscriber(this.#model, previous))
  }

  protected next = (current: T) => {
    const previous = this.#model

    this.#model = current

    this.#subscribers.forEach((subscriber) => subscriber(this.#model, previous))
  }
}

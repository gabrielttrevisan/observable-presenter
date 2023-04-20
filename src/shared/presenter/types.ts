export type Model = object

export type Subscriber<T> = (current: T, previous: T) => void

export type Unsubscriber = () => void

export interface Presenter<T extends Model> {
  get model(): T

  subscribe(subscriber: Subscriber<T>): Unsubscriber
  getSnapshot(): T
}

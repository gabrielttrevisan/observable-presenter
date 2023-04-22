import { useRef, useSyncExternalStore } from 'react'
import { ObservablePresenter } from './Presenter.observable'

export type Allocator<T> = () => T

export type InferModel<T> = T extends ObservablePresenter<infer M> ? M : never

export const usePresenter = <T>(allocate: Allocator<T>) => {
  type InferredModel = InferModel<T>

  const presenter = useRef(allocate()).current as ObservablePresenter<InferredModel>

  return [
    useSyncExternalStore<InferredModel>(presenter.subscribe, presenter.getSnapshot),
    presenter,
  ] as [InferredModel, T]
}

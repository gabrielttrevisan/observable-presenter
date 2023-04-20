import { useRef, useSyncExternalStore } from 'react';
import { IsPresenter } from './IsPresenter.abstract';
import { Model } from './types';

export type InferModel<T> = T extends IsPresenter<infer M> ? M : never;

export const usePresenter = <T extends Model, U extends IsPresenter<T>>(
  allocate: () => U
) => {
  const presenter = useRef(allocate()).current;
  return [
    useSyncExternalStore<T>(presenter.subscribe, presenter.getSnapshot),
    presenter,
  ] as const;
};
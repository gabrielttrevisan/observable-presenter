import { MouseEventHandler, useMemo } from 'react'
import {
  ActionButtonClassName,
  ActionButtonHookParams,
  ActionButtonHookTuple,
} from './ActionButton.types'

export function useActionButton({
  loading,
  status,
  onOpenForm,
  onSubmitForm,
  onLoadingClick = () => {},
}: ActionButtonHookParams): ActionButtonHookTuple {
  const tuple = useMemo<ActionButtonHookTuple>(() => {
    const map = {
      'open-form': onOpenForm,
      'submit-form': onSubmitForm,
      loading: onLoadingClick,
    } as Record<ActionButtonClassName, MouseEventHandler>
    const className = (loading ? 'loading' : status) as ActionButtonClassName

    return [className, map[className] ?? map.loading]
  }, [loading, status, onLoadingClick, onOpenForm, onSubmitForm])

  return tuple
}

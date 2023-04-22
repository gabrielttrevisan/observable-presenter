import { MouseEventHandler } from 'react'

export type ActionButtonStatus = 'open-form' | 'submit-form' | 'loading'

export type ActionButtonProps = {
  status: ActionButtonStatus
  onOpenForm: () => void
  onSubmitForm: () => void
  onLoadingClick?: () => void
  loading: boolean
}

export type ActionButtonHookParams = ActionButtonProps

export type ActionButtonClassName = 'loading' | ActionButtonStatus

export type ActionButtonHookTuple = [
  className: ActionButtonClassName,
  handleOnClick: MouseEventHandler
]

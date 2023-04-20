export type ActionButtonStatus = 'open-form' | 'submit-form' | 'loading'

export type ActionButtoProps = {
  status: ActionButtonStatus
  onOpenForm: () => void
  onSubmitForm: () => void
  onLoadingClick?: () => void
}

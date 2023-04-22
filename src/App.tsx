import { useCallback, useEffect, useState } from 'react'
import './App.css'
import { usePresenter } from './shared/presenter'
import {
  V1TodoPresenter,
  V1TodoRepository,
  V1TodoService,
} from './todo/presenter'
import { TodoComponent, TodoFormComponent } from './todo/view'
import { Todo } from './todo/model'
import { ActionButton } from './todo/view/ActionButton/ActionButton.component'

function getV1TodoPresenter() {
  return new V1TodoPresenter(new V1TodoRepository(new V1TodoService()))
}

type ButtonAction = 'open-form' | 'submit-form'

function App() {
  const [action, setAction] = useState<ButtonAction>('open-form')
  const [created, setCreated] = useState<Partial<Todo>>({})
  const [{ list, loading }, { get, create }] =
    usePresenter<V1TodoPresenter>(getV1TodoPresenter)

  const handleOnTodoFormChanged = useCallback(
    (value: Partial<Todo>) => setCreated({ ...created, ...value }),
    [created]
  )

  useEffect(() => {
    get()
  }, [])

  return (
    <div className='app'>
      {Array.from(list.entries()).map(([key, todo]) => (
        <TodoComponent key={key} {...todo} />
      ))}

      {action === 'submit-form' && !loading ? (
        <TodoFormComponent onChange={handleOnTodoFormChanged} />
      ) : (
        <></>
      )}

      <ActionButton
        loading={loading}
        status={action}
        onOpenForm={() => setAction('submit-form')}
        onSubmitForm={() => {
          if (
            created.title &&
            created.title.trim().length > 0 &&
            created.description &&
            created.description.trim().length > 0
          ) {
            ;(async () => {
              await create(created.title!, created.description!)
              setCreated({})
              setAction('open-form')
            })()
          }
        }}
      />
    </div>
  )
}

export default App

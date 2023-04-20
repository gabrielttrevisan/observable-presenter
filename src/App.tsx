import { useCallback, useEffect, useState } from 'react'
import './App.css'
import { usePresenter } from './presenter'
import {
  ToDoModel,
  Todo,
  V1TodoPresenter,
  V1TodoRepository,
  V1TodoService,
} from './todo/presenter'
import { TodoComponent, TodoFormComponent } from './todo/view'

function getV1TodoPresenter() {
  return new V1TodoPresenter(new V1TodoRepository(new V1TodoService()))
}

type ButtonAction = 'open-form' | 'submit-form'

function App() {
  const [action, setAction] = useState<ButtonAction>('open-form')
  const [created, setCreated] = useState<Partial<Todo>>({})
  const [{ list, loading }, { get, create }] = usePresenter<
    ToDoModel,
    V1TodoPresenter
  >(getV1TodoPresenter)

  const handleActionClick = useCallback(() => {
    if (action === 'open-form') {
      setAction('submit-form')
    } else {
      if (
        created.title &&
        created.title.trim().length > 0 &&
        created.description &&
        created.description.trim().length > 0
      ) {
        ;(async () => {
          await create(created.title!, created.description!)
          await get()
          setCreated({})
          setAction('open-form')
        })()
      }
    }
  }, [action, created])

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

      {action === 'submit-form' ? (
        <TodoFormComponent onChange={handleOnTodoFormChanged} />
      ) : (
        <></>
      )}

      <button className='todo-button' onClick={handleActionClick}>
        {loading ? (
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
            <path
              fill='#ffffff'
              d='M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10ZM19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z'
            ></path>
          </svg>
        ) : action === 'open-form' ? (
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
            <path
              d='M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z'
              fill='#ffffff'
            ></path>
          </svg>
        ) : (
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
            <path
              fill='#ffffff'
              d='M10.0007 15.1709L19.1931 5.97852L20.6073 7.39273L10.0007 17.9993L3.63672 11.6354L5.05093 10.2212L10.0007 15.1709Z'
            ></path>
          </svg>
        )}
      </button>
    </div>
  )
}

export default App

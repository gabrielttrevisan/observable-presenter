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
        console.log('create', created)
        create(created.title, created.description)
      }

      setAction('open-form')
    }
  }, [action])

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
        {action === 'open-form' ? (
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

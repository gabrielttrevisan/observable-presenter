import { FC } from 'react'
import { Todo } from '../presenter'
import './Todo.css'

export type TodoFormProps = {
  onChange: (todo: Partial<Todo>) => void
}

export const TodoFormComponent: FC<TodoFormProps> = ({ onChange }) => {
  return (
    <div role='listitem' className='todo-form'>
      <input
        type='text'
        name='title'
        placeholder='Título'
        onChange={(e) =>
          onChange({
            title: e.target.value,
          })
        }
        autoFocus
      />

      <input
        type='text'
        name='description'
        placeholder='Descrição'
        onChange={(e) => {
          onChange({
            description: e.target.value,
          })
        }}
      />
    </div>
  )
}

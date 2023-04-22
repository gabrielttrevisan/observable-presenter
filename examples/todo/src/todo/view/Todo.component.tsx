import { FC } from 'react'
import { Todo as TodoComponentProps } from '../presenter'
import './Todo.css'

export const TodoComponent: FC<TodoComponentProps> = ({
  id,
  description,
  title,
}) => {
  return (
    <div role='listitem' id={id} className='todo'>
      <span>{title}</span>
      <span>{description}</span>
    </div>
  )
}

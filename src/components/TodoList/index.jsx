import cs from 'classnames';
import TodoItem from '@components/TodoItem';
import { useTodoState } from '@context/TodoContext';
import styles from './styles.module.scss';

export default function TodoList({ className }) {
  const { todos } = useTodoState();

  return (
    <div role="list" className={cs(className, styles.list)}>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}

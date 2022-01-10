import TodoList from '@components/TodoList';
import TodoInput from '@components/TodoInput';
import { useTodo } from '@context/TodoContext';
import TodoSelect from '@components/TodoSelect';
import styles from './styles.module.scss';

export default function TodoPage() {
  const { addTodo } = useTodo();

  return (
    <div className={styles.page}>
      <TodoInput onSave={addTodo} className={styles.input} />
      <TodoSelect className={styles.select} />
      <TodoList className={styles.list} />
    </div>
  );
}

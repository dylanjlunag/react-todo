import TodoList from '@components/TodoList';
import TodoInput from '@components/TodoInput';
import TodoSelect from '@components/TodoSelect';
import styles from './styles.module.scss';

export default function TodoPage() {
  return (
    <div className={styles.page}>
      <TodoInput className={styles.input} />
      <TodoSelect className={styles.select} />
      <TodoList className={styles.list} />
    </div>
  );
}

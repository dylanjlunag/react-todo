import cs from 'classnames';
import { useState } from 'react';
import Icon from '@components/Icon';
import { useTodo } from '@context/TodoContext';
import styles from './styles.module.scss';

export default function TodoInput({ className }) {
  const { addTodo } = useTodo();
  const [todo, setTodo] = useState('');

  const handleChangeTodo = (e) => {
    setTodo(e.target.value);
  };

  const handleSaveTodo = (e) => {
    e.preventDefault();
    if (!todo.trim()) {
      return;
    }
    addTodo(todo);
    setTodo('');
  };

  return (
    <div className={cs(className, styles.group)}>
      <input
        value={todo}
        onChange={handleChangeTodo}
        type="text"
        className={styles.input}
        placeholder="What needs to be done?"
      />
      <button type="button" aria-label="Save todo" className={styles.button} onClick={handleSaveTodo}>
        <Icon type="plus" className={styles.icon} />
      </button>
    </div>
  );
}

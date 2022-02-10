import cs from 'classnames';
import { useRef } from 'react';
import Icon from '@components/Icon';
import { useTodo } from '@context/TodoContext';
import styles from './styles.module.scss';

export default function TodoInput({ className }) {
  const todoInput = useRef();
  const { addTodo } = useTodo();

  const handleSaveTodo = () => {
    const value = todoInput.current.value.trim();
    if (value) {
      addTodo(value);
      todoInput.current.value = '';
    }

    return false;
  };

  return (
    <div className={cs(className, styles.group)}>
      <input type="text" ref={todoInput} className={styles.input} placeholder="What needs to be done?" />
      <button type="button" className={styles.button} onClick={handleSaveTodo}>
        <Icon type="plus" className={styles.icon} />
      </button>
    </div>
  );
}

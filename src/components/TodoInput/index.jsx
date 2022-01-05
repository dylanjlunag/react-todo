import { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@components/Icon';
import styles from './styles.module.scss';

function TodoInput({ onSave }) {
  const [todo, setTodo] = useState('');
  const handleChangeTodo = (e) => {
    setTodo(e.target.value);
  };
  const handleSaveTodo = (e) => {
    e.preventDefault();
    if (!todo.trim()) {
      return;
    }
    onSave(todo);
    setTodo('');
  };

  return (
    <div className={styles.group}>
      <input
        value={todo}
        onChange={handleChangeTodo}
        type="text"
        className={styles.input}
        placeholder="What needs to be done?"
      />
      <button type="button" className={styles.button} onClick={handleSaveTodo}>
        <Icon type="plus" className={styles.icon} />
      </button>
    </div>
  );
}

TodoInput.propTypes = {
  onSave: PropTypes.func.isRequired
};

export default TodoInput;

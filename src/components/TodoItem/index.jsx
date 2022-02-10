import cs from 'classnames';
import { memo } from 'react';
import PropTypes from 'prop-types';
import Icon from '@components/Icon';
import { useTodoUpdater } from '@context/TodoContext';
import styles from './styles.module.scss';

function TodoItem({ todo }) {
  const { completeTodo, removeTodo } = useTodoUpdater();
  return (
    <div className={cs(styles.item, { [styles.completed]: todo.completed })} role="listitem">
      <span className={styles.text}>{todo.text}</span>

      <button type="button" className={cs(styles.button, styles.complete)} onClick={() => completeTodo(todo.id)}>
        <Icon type="check" />
      </button>

      <button type="button" className={cs(styles.button, styles.remove)} onClick={() => removeTodo(todo.id)}>
        <Icon type="delete" />
      </button>
    </div>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired
};

export default memo(TodoItem);

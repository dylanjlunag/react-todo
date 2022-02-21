import cs from 'classnames';
import PropTypes from 'prop-types';
import Icon from '@components/Icon';
import { useTodo } from '@context/TodoContext';
import styles from './styles.module.scss';

function TodoItem({ todo }) {
  const { completeTodo, removeTodo } = useTodo();
  return (
    <div className={cs(styles.item, { [styles.completed]: todo.completed })} role="listitem">
      <span className={styles.text}>{todo.text}</span>

      <button
        type="button"
        aria-label="Complete todo"
        className={cs(styles.button, styles.complete)}
        onClick={() => completeTodo(todo.id)}>
        <Icon type="check" />
      </button>

      <button
        type="button"
        aria-label="Remove todo"
        className={cs(styles.button, styles.remove)}
        onClick={() => removeTodo(todo.id)}>
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

export default TodoItem;

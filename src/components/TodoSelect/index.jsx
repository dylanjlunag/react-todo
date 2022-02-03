import { useTodo } from '@context/TodoContext';
import styles from './styles.module.scss';

export default function TodoSelect() {
  const { filters, selectFilter } = useTodo();

  const handleChange = (e) => {
    selectFilter(e.target.value);
  };

  return (
    <select className={styles.select} onChange={handleChange}>
      {filters.map((filter) => (
        <option key={filter.id} value={filter.id}>
          {filter.name}
        </option>
      ))}
    </select>
  );
}

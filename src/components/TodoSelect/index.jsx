import styles from './styles.module.scss';

export default function TodoSelect() {
  return (
    <select className={styles.select}>
      <option value="all">All</option>
      <option value="completed">Completed</option>
      <option value="uncompleted">Uncompleted</option>
    </select>
  );
}

import TodoPage from '@components/TodoPage';
import { TodoProvider } from '@context/TodoContext';

export default function App() {
  return (
    <TodoProvider>
      <TodoPage />
    </TodoProvider>
  );
}

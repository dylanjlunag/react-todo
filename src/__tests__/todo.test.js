import TodoPage from '@components/TodoPage';
import userEvent from '@testing-library/user-event';
import { TodoProvider } from '@context/TodoContext';
import { render, screen } from '@testing-library/react';

function renderTodoPage() {
  render(<TodoPage />, {
    wrapper: TodoProvider
  });
}

const todoText = 'Test todo app';

describe('Todo app', () => {
  it('should save a todo', () => {
    renderTodoPage();

    const input = screen.getByPlaceholderText('What needs to be done?');

    userEvent.type(input, todoText);
    expect(input).toHaveValue(todoText);

    userEvent.click(screen.getByRole('button', { name: 'Save todo' }));
    expect(input).toHaveValue('');

    expect(screen.getByText(todoText)).toBeInTheDocument();
  });

  it("should'nt save a todo if only constains blank characters", () => {
    renderTodoPage();

    const blankTodoText = ' ';

    userEvent.type(screen.getByPlaceholderText('What needs to be done?'), blankTodoText);
    userEvent.click(screen.getByRole('button', { name: 'Save todo' }));

    expect(screen.queryByText(blankTodoText)).not.toBeInTheDocument();
  });

  it('should complete a todo', () => {
    renderTodoPage();

    userEvent.type(screen.getByPlaceholderText('What needs to be done?'), todoText);
    userEvent.click(screen.getByRole('button', { name: 'Save todo' }));

    const completeButton = screen.getByRole('button', { name: 'Complete todo' });
    expect(completeButton).toBeInTheDocument();

    userEvent.click(completeButton);
  });

  it('should remove a todo', () => {
    renderTodoPage();

    userEvent.type(screen.getByPlaceholderText('What needs to be done?'), todoText);
    userEvent.click(screen.getByRole('button', { name: 'Save todo' }));

    const removeButton = screen.getByRole('button', { name: 'Remove todo' });
    expect(removeButton).toBeInTheDocument();

    userEvent.click(removeButton);
    expect(screen.queryByText(todoText)).not.toBeInTheDocument();
  });

  it('should filter todos', () => {
    renderTodoPage();

    let todo;
    let completedTodo;
    const completedTodoText = 'Completed todo';
    const todoInput = screen.getByPlaceholderText('What needs to be done?');
    const saveButton = screen.getByRole('button', { name: 'Save todo' });

    userEvent.type(todoInput, completedTodoText);
    userEvent.click(saveButton);

    userEvent.click(screen.getByRole('button', { name: 'Complete todo' }));

    userEvent.type(todoInput, todoText);
    userEvent.click(saveButton);

    const todoSelect = screen.getByRole('combobox');
    expect(todoSelect).toBeInTheDocument();

    userEvent.selectOptions(todoSelect, ['completed']);

    todo = screen.queryByText(todoText);
    completedTodo = screen.getByText(completedTodoText);

    expect(todo).not.toBeInTheDocument();
    expect(completedTodo).toBeInTheDocument();

    userEvent.selectOptions(todoSelect, ['uncompleted']);

    todo = screen.getByText(todoText);
    completedTodo = screen.queryByText(completedTodoText);

    expect(todo).toBeInTheDocument();
    expect(completedTodo).not.toBeInTheDocument();

    userEvent.selectOptions(todoSelect, ['all']);

    todo = screen.getByText(todoText);
    completedTodo = screen.getByText(completedTodoText);

    expect(todo).toBeInTheDocument();
    expect(completedTodo).toBeInTheDocument();
  });
});

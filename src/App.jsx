import { useState, useEffect } from 'react';
import './App.css';
import Cookies from 'js-cookie';
import TodoItem from './components/TodoItem';

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = Cookies.get('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    Cookies.set('todos', JSON.stringify(todos), { expires: 365 * 10 });
  }, [todos]);

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { text: newTodo, completed: false, id: Date.now() }]);
      setNewTodo('');
    }
  };

  const handleSwipe = (direction, id) => {
    if (direction === 'left') {
      const todoToSwipe = todos.find(todo => todo.id === id);
      if (todoToSwipe && todoToSwipe.completed) {
        // If item is completed, mark as undone
        setTodos(
          todos.map(todo =>
            todo.id === id ? { ...todo, completed: false } : todo
          )
        );
      } else {
        // If item is not completed, delete it
        setTodos(todos.filter(todo => todo.id !== id));
      }
    } else if (direction === 'right') {
      // Toggle completed state (mark as done or undone)
      setTodos(
        todos.map(todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    }
  };

  return (
    <div className="app">
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            index={index}
            handleSwipe={handleSwipe}
          />
        ))}
      </ul>
      <div className="input-container">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
        <button onClick={handleAddTodo}>+</button>
      </div>
    </div>
  );
}

export default App;

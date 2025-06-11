import { useState, useEffect } from 'react';


const TodoList = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (task.trim() === '') return alert('Task cannot be empty');
    const newTask = {
      id: Date.now(),
      text: task,
      completed: false,
    };
    setTasks([newTask, ...tasks]);
    setTask('');
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'completed') return t.completed;
    if (filter === 'active') return !t.completed;
    return true;
  });

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <div>
        <input
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Add</button>
      </div>

      <div className="todo-controls">
  <button onClick={() => setFilter('all')}>All</button>
  <button onClick={() => setFilter('active')}>Active</button>
  <button onClick={() => setFilter('completed')}>Completed</button>
  </div>


      <ul style={{ padding: 0, listStyle: 'none' }}>
        {filteredTasks.map(t => (
          <li key={t.id} style={{ marginTop: '8px' }}>
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggleComplete(t.id)}
            />
            <span
              style={{
                marginLeft: '8px',
                textDecoration: t.completed ? 'line-through' : 'none',
              }}
            >
              {t.text}
            </span>
            <button
              style={{ marginLeft: '12px', color: 'red' }}
              onClick={() => removeTask(t.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

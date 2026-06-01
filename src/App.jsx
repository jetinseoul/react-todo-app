import { useState, useEffect } from 'react'
import TodoInput from './components/TodoInput'
import TodoItem from './components/TodoItem'
import './App.css'

const STORAGE_KEY = 'todos'

export default function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  })
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function addTodo(text) {
    setTodos(prev => [
      { id: Date.now(), text, completed: false },
      ...prev,
    ])
  }

  function toggleTodo(id) {
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }

  function deleteTodo(id) {
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  function clearCompleted() {
    setTodos(prev => prev.filter(t => !t.completed))
  }

  const filtered = todos.filter(t => {
    if (filter === 'active') return !t.completed
    if (filter === 'completed') return t.completed
    return true
  })

  const activeCount = todos.filter(t => !t.completed).length

  return (
    <div className="app">
      <h1 className="title">TODO</h1>

      <TodoInput onAdd={addTodo} />

      {todos.length > 0 && (
        <>
          <div className="filters">
            {['all', 'active', 'completed'].map(f => (
              <button
                key={f}
                className={`filter-btn ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f === 'all' ? '전체' : f === 'active' ? '미완료' : '완료'}
              </button>
            ))}
          </div>

          <ul className="todo-list">
            {filtered.length === 0 ? (
              <li className="empty">항목이 없습니다.</li>
            ) : (
              filtered.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                />
              ))
            )}
          </ul>

          <div className="footer">
            <span className="count">{activeCount}개 남음</span>
            {todos.some(t => t.completed) && (
              <button className="clear-btn" onClick={clearCompleted}>
                완료 항목 삭제
              </button>
            )}
          </div>
        </>
      )}
    </div>
  )
}

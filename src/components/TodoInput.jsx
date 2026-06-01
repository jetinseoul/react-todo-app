import { useState } from 'react'
import './TodoInput.css'

export default function TodoInput({ onAdd }) {
  const [text, setText] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setText('')
  }

  return (
    <form className="todo-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="할 일을 입력하세요..."
        autoFocus
      />
      <button type="submit" disabled={!text.trim()}>
        추가
      </button>
    </form>
  )
}

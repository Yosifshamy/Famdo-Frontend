import React from "react";

export default function TodoList({ todos, onToggle, onDelete }) {
  if (!todos.length) return <p>No todos yet — add one!</p>;

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo._id} className="todo-item">
          <input
            type="checkbox"
            checked={todo.done}
            onChange={() => onToggle(todo._id, !todo.done)}
          />
          <div style={{ flex: 1, marginLeft: 10 }}>
            <span
              className="todo-text"
              style={{ textDecoration: todo.done ? "line-through" : "none" }}
            >
              {todo.text}
            </span>
            <div className="todo-details">
              {todo.describtion && (
                <div className="todo-description">{todo.describtion}</div>
              )}
              {todo.deadline && (
                <div className="todo-deadline">
                  Deadline: {new Date(todo.deadline).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>
          <div className="todo-actions">
            <button
              className="todo-delete-btn"
              onClick={() => onDelete(todo._id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

import React, { useEffect, useState } from "react";
import api from "../api";
import TodoForm from "./TodoForm";

export default function FamilyTodos({ familyId }) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const { data } = await api.get(`/family/${familyId}/todos`);
        setTodos(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching family todos:", error);
        setTodos([]);
        setLoading(false);
      }
    };
    fetchTodos();
  }, [familyId]);

  // Add function to create family todos
  const handleAddFamilyTodo = async (todoData) => {
    try {
      const { data } = await api.post(`/family/${familyId}/todos`, todoData);
      setTodos([data, ...todos]); // Add new todo to the beginning of the list
    } catch (error) {
      console.error("Error creating family todo:", error);
    }
  };

  // Toggle todo completion
  const handleToggleTodo = async (todoId, currentStatus) => {
    try {
      const { data } = await api.put(`/family/${familyId}/todos/${todoId}`, {
        done: !currentStatus,
      });
      setTodos(todos.map((todo) => (todo._id === todoId ? data : todo)));
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  // Delete todo
  const handleDeleteTodo = async (todoId) => {
    try {
      await api.delete(`/family/${familyId}/todos/${todoId}`);
      setTodos(todos.filter((todo) => todo._id !== todoId));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  if (loading) {
    return (
      <div className="family-todos">
        <h2 className="page-title">Family To-do</h2>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="family-todos">
      <h2 className="page-title">Family To-do</h2>

      {/* Add TodoForm for creating family todos */}
      <TodoForm onAdd={handleAddFamilyTodo} />

      {todos.length === 0 ? (
        <p>No family todos yet — add one!</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo._id} className="todo-item">
              <input
                type="checkbox"
                checked={todo.done || false}
                onChange={() => handleToggleTodo(todo._id, todo.done)}
              />
              <div style={{ flex: 1, marginLeft: 10 }}>
                <div className="todo-header">
                  <span
                    className="todo-text"
                    style={{
                      textDecoration: todo.done ? "line-through" : "none",
                      opacity: todo.done ? 0.6 : 1,
                    }}
                  >
                    {todo.text}
                  </span>
                  <span className="todo-creator">
                    Created by:{" "}
                    {todo.user?.username || todo.user?.email || "Unknown"}
                  </span>
                </div>

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
                  onClick={() => handleDeleteTodo(todo._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import "./App.css";
import api from "./api";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import ProtectedRoute from "./components/ProtectedRoute";
import Nav from "./components/Nav";

function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  async function fetchTodos() {
    setLoading(true);
    try {
      // No need to manually add token - api interceptor handles it
      const { data } = await api.get("/todos");
      setTodos(data);
    } catch {
      setTodos([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (todoData) => {
    // No need to manually add token - api interceptor handles it
    const res = await api.post("/todos", todoData);
    setTodos((prev) => [res.data, ...prev]);
    setShowModal(false);
  };

  const toggleTodo = async (id, done) => {
    // No need to manually add token - api interceptor handles it
    const res = await api.put(`/todos/${id}`, { done });
    setTodos((prev) => prev.map((t) => (t._id === id ? res.data : t)));
  };

  const deleteTodo = async (id) => {
    // No need to manually add token - api interceptor handles it
    await api.delete(`/todos/${id}`);
    setTodos((prev) => prev.filter((t) => t._id !== id));
  };

  return (
    <>
      <div className="personal-todos">
        <h1 className="page-title">My To-do List</h1>

        <button className="open-modal-btn" onClick={() => setShowModal(true)}>
          + Add To-do
        </button>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="todo-list-card">
            <TodoList
              todos={todos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          </div>
        )}
      </div>
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Add New To-do</h2>
            <TodoForm onAdd={addTodo} />
            <button
              className="close-modal-btn"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default function App() {
  return (
    <>
      <Nav />
      <div className="family-page-container">
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </div>
    </>
  );
}
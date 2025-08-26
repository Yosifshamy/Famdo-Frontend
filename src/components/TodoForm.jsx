import React, { useState } from "react";

export default function TodoForm({ onAdd }) {
  const [text, setText] = useState("");
  const [describtion, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await onAdd({
      text: text.trim(),
      describtion: describtion.trim(),
      deadline: deadline,
    });
    setText("");
    setDescription("");
    setDeadline("");
  };

  return (
    <form onSubmit={submit} className="todo-form flex gap-2 mb-4">
      <input
        className="todo-input"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add new todo"
      />
      <input
        className="todo-input"
        type="text"
        value={describtion}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Add description (optional)"
      />
      <input
        className="todo-input"
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        placeholder="Add deadline (optional)"
      />
      <button className="todo-add-btn" type="submit">
        Add
      </button>
    </form>
  );
}

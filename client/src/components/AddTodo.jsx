import React, { useState } from 'react';

function AddTodo({ onAddTodo }) {
    const [title, setTitle] = useState('');
    const [isPriority, setIsPriority] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim()) {
            onAddTodo({ description: title, completed: false, isPriority });
            setTitle('');
            setIsPriority(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter new todo"
                style={{ 
                    padding: '8px',
                    marginRight: '8px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    flexGrow: 1
                }}
            />
            <label style={{ display: 'flex', alignItems: 'center', marginRight: '8px' }}>
                <input
                    type="checkbox"
                    checked={isPriority}
                    onChange={(e) => setIsPriority(e.target.checked)}
                    style={{ marginRight: '4px' }}
                />
                Priority?
            </label>
            <button 
                type="submit"
                style={{
                    padding: '8px 16px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                Add Todo
            </button>
        </form>
    );
}

export default AddTodo;
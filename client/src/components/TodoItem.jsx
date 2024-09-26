import React, { useState } from 'react';
import AddTodo from './AddTodo';
import { TOP_LEVEL } from '../consts';
import '../App.css';

function TodoItem({ todo, onToggleComplete, parentId, onAddSubTodo }) {
    const handleToggle = () => {
        onToggleComplete(todo.id, parentId);
    };

    const handleAddSubTodo = (newTodo) => {
        console.log("called handleAddSubTodo", newTodo);
        onAddSubTodo(newTodo, todo.id);
    }

    const [isAddingSubTodo, setIsAddingSubTodo] = useState(false);

    const priority = todo.isPriority;
    const canAddSubtasks = parentId === TOP_LEVEL;

    return (
        <li style={{ listStyleType: 'none', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={handleToggle}
                    style={{ marginRight: '10px' }}
                    disabled={todo?.subtasks?.length > 0}
                />
                <span class={priority ? 'priority-item' : ''} style={{ 
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? '#888' : '#fff'
                }}>
                    {todo.description}
                </span>
                {canAddSubtasks && <button 
                    onClick={() => setIsAddingSubTodo(!isAddingSubTodo)}
                    style={{ marginLeft: '10px', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                    {isAddingSubTodo ? '−' : '+'}
                </button>}
            </div>
            {todo.subtasks?.length > 0 && (
            <ul style={{ paddingLeft: '20px' }}>
                {todo.subtasks.map(subTodo => (
                <TodoItem 
                    key={subTodo.id} 
                    todo={subTodo} 
                    onToggleComplete={onToggleComplete}
                    parentId={todo.id}
                />
                ))}
            </ul>
            )}
            {isAddingSubTodo && (
                <AddTodo style={{paddingLeft: '12px'}} onAddTodo={handleAddSubTodo} />
            )}
        </li>
    );
}

export default TodoItem;
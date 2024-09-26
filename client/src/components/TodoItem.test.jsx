import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import TodoItem from './TodoItem';
import { TOP_LEVEL } from '../consts';

describe('TodoItem', () => {
    const mockTodo = {
        id: '1',
        description: 'Test Todo',
        completed: false,
        isPriority: false,
        subtasks: []
    };

    const mockOnToggleComplete = jest.fn();
    const mockOnAddSubTodo = jest.fn();

    it('renders todo item correctly', () => {
        render(<TodoItem todo={mockTodo} onToggleComplete={mockOnToggleComplete} parentId={TOP_LEVEL} onAddSubTodo={mockOnAddSubTodo} />);
    
        expect(screen.getByText('Test Todo')).toBeInTheDocument();
        expect(screen.getByRole('checkbox')).not.toBeChecked();
    });

    it('calls onToggleComplete when checkbox is clicked', () => {
        render(<TodoItem todo={mockTodo} onToggleComplete={mockOnToggleComplete} parentId={TOP_LEVEL} onAddSubTodo={mockOnAddSubTodo} />);
    
        fireEvent.click(screen.getByRole('checkbox'));
        expect(mockOnToggleComplete).toHaveBeenCalledWith('1', TOP_LEVEL);
    });

    it('shows add subtask button for top-level todos', () => {
        render(<TodoItem todo={mockTodo} onToggleComplete={mockOnToggleComplete} parentId={TOP_LEVEL} onAddSubTodo={mockOnAddSubTodo} />);
    
        expect(screen.getByText('+')).toBeInTheDocument();
    });

    it('does not show add subtask button for non-top-level todos', () => {
        render(<TodoItem todo={mockTodo} onToggleComplete={mockOnToggleComplete} parentId="someParentId" onAddSubTodo={mockOnAddSubTodo} />);
    
        expect(screen.queryByText('+')).not.toBeInTheDocument();
    });
});
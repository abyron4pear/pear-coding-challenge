import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AddTodo from './AddTodo';

describe('AddTodo', () => {
    const mockOnAddTodo = jest.fn();

    it('renders input and button', () => {
        render(<AddTodo onAddTodo={mockOnAddTodo} />);
    
        expect(screen.getByPlaceholderText('Enter new todo')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /add todo/i })).toBeInTheDocument();
    });

    it('calls onAddTodo with new todo when form is submitted', () => {
        render(<AddTodo onAddTodo={mockOnAddTodo} />);
    
        const input = screen.getByPlaceholderText('Enter new todo');
        const button = screen.getByRole('button', { name: /add todo/i });

        fireEvent.change(input, { target: { value: 'New Todo' } });
        fireEvent.click(button);

        expect(mockOnAddTodo).toHaveBeenCalledWith(expect.objectContaining({
            description: 'New Todo',
            completed: false,
            isPriority: false
        }));
    });

    it('clears input after form submission', () => {
        render(<AddTodo onAddTodo={mockOnAddTodo} />);
    
        const input = screen.getByPlaceholderText('Enter new todo');
        const button = screen.getByRole('button', { name: /add todo/i });

        fireEvent.change(input, { target: { value: 'New Todo' } });
        fireEvent.click(button);

        expect(input.value).toBe('');
    });
});
import { useEffect, useState } from 'react';
import { getTodoList, addTodo, updateTodo } from './services/todoService';
import { sortTodos } from './utils';
import TodoItem from './components/TodoItem';
import AddTodo from './components/AddTodo';
import { TOP_LEVEL } from './consts';
import { nanoid } from 'nanoid';
import './App.css';

function App() {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    fetchTodoList();
  }, []);

  const fetchTodoList = async () => {
    const response = await getTodoList();
    setTodoList(response);
  }

  const toggleTodoComplete = async (id, parentId) => {
    try {
      const {parent, todoToUpdate} = findTodo(id, parentId);
      if (!todoToUpdate) return;

      const updatedTodo = {...todoToUpdate, completed: !todoToUpdate.completed};
      let payload = updatedTodo;
      if (parent) {
        const idx = parent.subtasks.findIndex(todo => todo.id === updatedTodo.id);
        parent.subtasks[idx] = updatedTodo;
        payload = parent;
        const completedCount = payload.subtasks.reduce((count, todo) => {
          return todo.completed ? count + 1 : count;
        }, 0);
        if (completedCount === payload.subtasks.length && completedCount > 0) {
          payload.completed = true;
        } else {
          payload.completed = false;
        }
      } 
      const response = await updateTodo(payload);
      if (response) {
        setTodoList(updateTodoInState(todoList, payload));
      }

    } catch (err) {
      console.warn("couldn't update todo", err);
    }
  }

  const addTodoItem = async (newTodo) => {
    try {
      const response = await addTodo(newTodo);
      setTodoList([...todoList, response]);
    } catch {
      console.warn("couldn't add todo");
    }
  }

  const addSubTodoItem = async (newSubTodo, parentId) => {
    const {todoToUpdate} = findTodo(parentId);
    if (!todoToUpdate) return;

    if (!Array.isArray(todoToUpdate.subtasks)) {
      todoToUpdate.subtasks = [];
    }
    newSubTodo.order = todoToUpdate.subtasks.length;
    newSubTodo.id = nanoid();
    todoToUpdate.subtasks.push(newSubTodo);
    todoToUpdate.completed = false;
    const response = await updateTodo(todoToUpdate);
    if (response) {
      setTodoList(updateTodoInState(todoList, todoToUpdate));
    }
  }

  const findTodo = (id, parentId) => {
    let todoListLocal = todoList;
    let parent = null;
    if (parentId && parentId !== TOP_LEVEL) {
      parent = todoList.find(todo => todo.id === parentId);
      todoListLocal = parent?.subtasks;
    }
    const todoToUpdate = todoListLocal.find(todo => todo.id === id);
    return {
      parent: parent,
      todoToUpdate: todoToUpdate,
    };
  }

  const updateTodoInState = (todoList, updatedTodo) => {
    return todoList.map(todo => {
      if (todo.id === updatedTodo.id) {
        updatedTodo?.subtasks.sort(sortTodos);
        return updatedTodo;
      }
      return todo;
    }).sort(sortTodos);
  }

  return (
    <>
      <h3 style={{ color: "#fff"}}>My awesome todo list</h3>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
      {todoList.map(todo => (
        <TodoItem 
          key={todo.id} 
          todo={todo} 
          onToggleComplete={toggleTodoComplete}
          parentId={TOP_LEVEL}
          onAddSubTodo={addSubTodoItem}
        />
      ))}
      </ul>
      <AddTodo onAddTodo={addTodoItem} />
    </>
  );
}

export default App;

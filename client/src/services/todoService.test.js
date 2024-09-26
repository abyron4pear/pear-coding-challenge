import apiService from './index';
import { getTodoList, addTodo } from './todoService';

jest.mock('./index', () => ({
    get: jest.fn(),
    post: jest.fn(),
}));


describe('todoService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('fetches todos successfully', async () => {
        const mockTodos = [{ id: 1, description: 'Test Todo', completed: false, isPriority: false, order: 0, subtasks: [] }];
        apiService.get.mockResolvedValue({ data: mockTodos });

        const result = await getTodoList();

        expect(apiService.get).toHaveBeenCalledWith('/todo');
        expect(result).toEqual(mockTodos);
    });

    it('adds a new todo successfully', async () => {
        const newTodo = { description: 'New Todo', completed: false };
        const mockResponse = { id: 2, ...newTodo };
        apiService.post.mockResolvedValue({ data: mockResponse });

        const result = await addTodo(newTodo);

        expect(apiService.post).toHaveBeenCalledWith('/todo', newTodo);
        expect(result).toEqual(mockResponse);
    });
});
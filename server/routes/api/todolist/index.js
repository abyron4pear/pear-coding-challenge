const router = require('express').Router();
const { readJsonFile, writeJsonFile } = require('../../../services/files');

const dbFilePath = 'server/db.json';


router.get('/', async (req, res) => {
    try {
        const todoList = await readJsonFile(dbFilePath);
        res.json(todoList);
    } catch {
        res.json([]);
    }
});

router.post('/', async (req, res) => {
    let todoList;
    try {
        todoList = await readJsonFile(dbFilePath);
    } catch {
        todoList = [];
    }

    const { nanoid } = await import('nanoid');
    
    const data = req.body;
    data.order = todoList.length;
    data.id = nanoid();
    todoList.push(data);
    await writeJsonFile(dbFilePath, todoList);
    res.json(data);
});

router.put('/', async (req, res) => {
    const todoList = await readJsonFile(dbFilePath);
    const data = req.body;
    const idx = todoList.findIndex(todo => todo.id === data.id);
    todoList[idx] = data;
    await writeJsonFile(dbFilePath, todoList);
    res.json(data);
}); 
  
module.exports = router;
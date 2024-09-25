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
    
    const data = req.body;
    data.id = todoList.length;
    todoList.push(data);
    await writeJsonFile(dbFilePath, todoList);
});

router.put('/', async (req, res) => {
    const todoList = await readJsonFile(dbFilePath);
    const data = req.body;
    todoList[data.id] = data;
    await writeJsonFile(dbFilePath, todoList);
}); 
  
module.exports = router;
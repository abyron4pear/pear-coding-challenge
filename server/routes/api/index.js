const router = require('express').Router();
const helloRoutes = require('./hello');
const todoRoutes = require('./todolist');

router.use('/hello', helloRoutes);
router.use('/todo', todoRoutes);

module.exports = router;

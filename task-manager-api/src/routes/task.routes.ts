import { Router } from 'express'
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/task.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

const taskRoutes = Router()

taskRoutes.use(authMiddleware)

taskRoutes.post('/', createTask)
taskRoutes.get('/', getTasks)
taskRoutes.put('/:id', updateTask)
taskRoutes.delete('/:id', deleteTask)

export { taskRoutes }
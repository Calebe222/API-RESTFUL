import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'
import { createTaskSchema, updateTaskSchema } from '../schemas/task.schema'

export async function createTask(req: Request, res: Response) {
  try {
    const { title, description, priority } = createTaskSchema.parse(req.body)
    const userId = req.userId!

    const task = await prisma.task.create({
      data: {
        title,
        description,
        priority,
        userId,
      },
    })

    return res.status(201).json(task)
  } catch (error: any) {
    return res.status(400).json({ error: error.errors || error.message })
  }
}

export async function getTasks(req: Request, res: Response) {
  const userId = req.userId!

  const tasks = await prisma.task.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  })

  return res.json(tasks)
}

export async function updateTask(req: Request, res: Response) {
  try {
    const { id } = req.params as { id: string }
    const userId = req.userId!
    const data = updateTaskSchema.parse(req.body)

    const taskExists = await prisma.task.findFirst({
      where: { id, userId },
    })

    if (!taskExists) {
      return res.status(404).json({ error: 'Tarefa não encontrada' })
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data,
    })

    return res.json(updatedTask)
  } catch (error: any) {
    return res.status(400).json({ error: error.errors || error.message })
  }
}

export async function deleteTask(req: Request, res: Response) {
  try {
    const { id } = req.params as { id: string }
    const userId = req.userId!

    const taskExists = await prisma.task.findFirst({
      where: { id, userId },
    })

    if (!taskExists) {
      return res.status(404).json({ error: 'Tarefa não encontrada' })
    }

    await prisma.task.delete({
      where: { id },
    })

    return res.status(204).send()
  } catch (error: any) {
    return res.status(400).json({ error: error.errors || error.message })
  }
}
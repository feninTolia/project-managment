import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getTasks = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.query;
    const tasks = await prisma.task.findMany({
      where: { projectId: Number(projectId) },
      include: {
        author: true,
        assignee: true,
        attachments: true,
        comments: true,
      },
    });
    res.json(tasks);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving tasks: ${error.message}` });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      status,
      priority,
      tags,
      startDate,
      dueDate,
      points,
      projectId,
      authorUserId,
      assignedUserId,
    } = req.body;

    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        status,
        priority,
        tags,
        startDate,
        dueDate,
        points,
        projectId,
        authorUserId,
        assignedUserId,
      },
    });

    res.status(201).json(newTask);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error creating a task: ${error.message}` });
  }
};

export const updateTaskStatus = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    const updatedTask = await prisma.task.update({
      where: { id: Number(taskId) },
      data: { status },
    });
    res.json(updatedTask);
  } catch (error: any) {
    res.status(500).json({ message: `Error updating task: ${error.message}` });
  }
};

export const getUserTasks = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const tasks = await prisma.task.findMany({
      where: {
        OR: [
          { authorUserId: Number(userId) },
          { assignedUserId: Number(userId) },
        ],
      },
      include: {
        author: true,
        assignee: true,
      },
    });
    res.json(tasks);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving user's tasks: ${error.message}` });
  }
};

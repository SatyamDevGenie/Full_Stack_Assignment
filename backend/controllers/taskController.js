import asyncHandler from 'express-async-handler';
import Task from '../models/Task.js';
import User from '../models/User.js';

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = asyncHandler(async (req, res) => {
  const { title, description, status, dueDate, assignee } = req.body;

  if (!title || !description || !dueDate) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  // Validate status
  const validStatuses = ['Todo', 'In Progress', 'Done'];
  if (status && !validStatuses.includes(status)) {
    res.status(400);
    throw new Error('Invalid status value');
  }

  // If assignee is provided, validate it exists
  if (assignee) {
    const assigneeUser = await User.findById(assignee);
    if (!assigneeUser) {
      res.status(404);
      throw new Error('Assignee user not found');
    }
  }

  const task = await Task.create({
    title,
    description,
    status: status || 'Todo',
    dueDate,
    creator: req.user._id,
    assignee: assignee || null,
  });

  const populatedTask = await Task.findById(task._id)
    .populate('creator', 'name email')
    .populate('assignee', 'name email');

  res.status(201).json(populatedTask);
});

// @desc    Get all tasks for logged in user
// @route   GET /api/tasks
// @access  Private
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({
    $or: [
      { creator: req.user._id },
      { assignee: req.user._id },
    ],
  })
    .populate('creator', 'name email')
    .populate('assignee', 'name email')
    .sort({ createdAt: -1 });

  res.json(tasks);
});

// @desc    Get single task by ID
// @route   GET /api/tasks/:id
// @access  Private
const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id)
    .populate('creator', 'name email')
    .populate('assignee', 'name email');

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  // Check if user is authorized to view this task
  const isCreator = task.creator._id.toString() === req.user._id.toString();
  const isAssignee = task.assignee && task.assignee._id.toString() === req.user._id.toString();

  if (!isCreator && !isAssignee) {
    res.status(403);
    throw new Error('Not authorized to access this task');
  }

  res.json(task);
});

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  const isCreator = task.creator.toString() === req.user._id.toString();
  const isAssignee = task.assignee && task.assignee.toString() === req.user._id.toString();

  if (!isCreator && !isAssignee) {
    res.status(403);
    throw new Error('Not authorized to update this task');
  }

  const { title, description, status, dueDate } = req.body;

  // Validate status if provided
  if (status) {
    const validStatuses = ['Todo', 'In Progress', 'Done'];
    if (!validStatuses.includes(status)) {
      res.status(400);
      throw new Error('Invalid status value');
    }
  }

  // Personal task (no assignee) - creator can update all fields
  if (!task.assignee) {
    if (isCreator) {
      task.title = title || task.title;
      task.description = description || task.description;
      task.status = status || task.status;
      task.dueDate = dueDate || task.dueDate;
    }
  } else {
    // Assigned task
    if (isAssignee) {
      // Assignee can only update status
      if (status) {
        task.status = status;
      }
      // Ignore other fields if provided
    } else if (isCreator) {
      // Assigner can update due date only
      if (dueDate) {
        task.dueDate = dueDate;
      }
      // Ignore status and other fields if provided
    }
  }

  const updatedTask = await task.save();

  const populatedTask = await Task.findById(updatedTask._id)
    .populate('creator', 'name email')
    .populate('assignee', 'name email');

  res.json(populatedTask);
});

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  const isCreator = task.creator.toString() === req.user._id.toString();

  if (!isCreator) {
    res.status(403);
    throw new Error('Not authorized to delete this task');
  }

  await Task.deleteOne({ _id: req.params.id });

  res.json({ message: 'Task removed successfully' });
});

export { createTask, getTasks, getTaskById, updateTask, deleteTask };
